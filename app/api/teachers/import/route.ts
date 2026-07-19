import { NextResponse } from "next/server";
import { createTeacher } from "@/lib/teachers";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: "CSV file is required" },
        { status: 400 }
      );
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json(
        { error: "File must be a CSV" },
        { status: 400 }
      );
    }

    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim());

    if (lines.length < 2) {
      return NextResponse.json(
        { error: "CSV must have a header row and at least one data row" },
        { status: 400 }
      );
    }

    const headerLine = lines[0];
    const headers = headerLine
      .split(",")
      .map((h) => h.trim().replace(/^"|"$/g, ""));

    const requiredFields = [
      "employeeId",
      "teacherName",
      "email",
      "phone",
      "subject",
      "joiningDate",
      "qualification",
      "address",
    ];

    const missingFields = requiredFields.filter(
      (f) => !headers.some((h) => h.toLowerCase() === f.toLowerCase())
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required columns: ${missingFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    function getValue(row: string[], field: string): string {
      const idx = headers.findIndex(
        (h) => h.toLowerCase() === field.toLowerCase()
      );
      if (idx === -1) return "";
      return row[idx]?.trim().replace(/^"|"$/g, "") ?? "";
    }

    const results: {
      row: number;
      employeeId: string;
      teacherName: string;
      status: "created" | "skipped" | "error";
      error?: string;
    }[] = [];

    let createdCount = 0;
    let errorCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",").map((c) => c.trim());
      const employeeId = getValue(row, "employeeId");

      if (!employeeId) {
        results.push({
          row: i + 1,
          employeeId: "",
          teacherName: getValue(row, "teacherName"),
          status: "skipped",
          error: "Empty employee ID",
        });
        continue;
      }

      const teacherName = getValue(row, "teacherName");
      if (!teacherName) {
        results.push({
          row: i + 1,
          employeeId,
          teacherName: "",
          status: "skipped",
          error: "Empty teacher name",
        });
        continue;
      }

      try {
        const teacher = await createTeacher({
          employeeId,
          teacherName,
          email: getValue(row, "email"),
          phone: getValue(row, "phone"),
          subject: getValue(row, "subject"),
          assignedClasses: getValue(row, "assignedClasses") || getValue(row, "assignedClass"),
          joiningDate: getValue(row, "joiningDate"),
          qualification: getValue(row, "qualification"),
          address: getValue(row, "address"),
          status: getValue(row, "status") || "Active",
          photoUrl: getValue(row, "photoUrl"),
        });

        createdCount++;
        results.push({
          row: i + 1,
          employeeId: teacher.employeeId,
          teacherName: teacher.teacherName,
          status: "created",
        });
      } catch (err: unknown) {
        errorCount++;
        const message =
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          (err as { code: string }).code === "P2002"
            ? "Duplicate employee ID"
            : "Failed to create teacher";
        results.push({
          row: i + 1,
          employeeId,
          teacherName,
          status: "error",
          error: message,
        });
      }
    }

    const admin = getAdminFromRequest(request);
    if (admin && createdCount > 0) {
      await createAuditLog({
        action: "CREATE",
        entity: "Teacher",
        adminId: admin.id,
        adminName: admin.name,
        details: JSON.stringify({ imported: createdCount, errors: errorCount, filename: file.name }),
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({
      summary: {
        total: lines.length - 1,
        created: createdCount,
        errors: errorCount,
        skipped: results.filter((r) => r.status === "skipped").length,
      },
      results,
    });
  } catch (error) {
    console.error("POST /api/teachers/import error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
