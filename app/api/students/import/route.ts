import { NextResponse } from "next/server";
import { createStudent } from "@/lib/students";
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
      "studentName",
      "fatherName",
      "motherName",
      "mobileNumber",
      "className",
      "section",
      "dateOfBirth",
      "address",
      "admissionDate",
    ];

    const missingFields = requiredFields.filter(
      (f) => !headers.some((h) => h.toLowerCase() === f.toLowerCase())
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required columns: ${missingFields.join(", ")}. Required: ${requiredFields.join(", ")}`,
        },
        { status: 400 }
      );
    }

    function getValue(
      row: string[],
      field: string
    ): string {
      const idx = headers.findIndex(
        (h) => h.toLowerCase() === field.toLowerCase()
      );
      if (idx === -1) return "";
      const val = row[idx]?.trim().replace(/^"|"$/g, "") ?? "";
      return val;
    }

    const results: {
      row: number;
      admissionNumber: string;
      studentName: string;
      status: "created" | "skipped" | "error";
      error?: string;
    }[] = [];

    let createdCount = 0;
    let errorCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(",").map((c) => c.trim());
      const admissionNumber = getValue(row, "admissionNumber");

      const studentName = getValue(row, "studentName");
      if (!studentName) {
        results.push({
          row: i + 1,
          admissionNumber,
          studentName: "",
          status: "skipped",
          error: "Empty student name",
        });
        continue;
      }

      try {
        const student = await createStudent({
          admissionNumber: admissionNumber || undefined,
          scholarNumber: getValue(row, "scholarNumber"),
          category: getValue(row, "category") || "General",
          caste: getValue(row, "caste"),
          penNumber: getValue(row, "penNumber"),
          aadhaarNumber: getValue(row, "aadhaarNumber"),
          whatsappNumber: getValue(row, "whatsappNumber"),
          studentName,
          fatherName: getValue(row, "fatherName"),
          motherName: getValue(row, "motherName"),
          mobileNumber: getValue(row, "mobileNumber"),
          alternateMobile: getValue(row, "alternateMobile"),
          dateOfBirth: getValue(row, "dateOfBirth"),
          gender: getValue(row, "gender"),
          className: getValue(row, "className"),
          section: getValue(row, "section"),
          address: getValue(row, "address"),
          admissionDate: getValue(row, "admissionDate"),
          status: getValue(row, "status") || "Active",
          photoUrl: getValue(row, "photoUrl"),
        });

        createdCount++;
        results.push({
          row: i + 1,
          admissionNumber: student.admissionNumber,
          studentName: student.studentName,
          status: "created",
        });
      } catch (err: unknown) {
        errorCount++;
        const message =
          typeof err === "object" &&
          err !== null &&
          "code" in err &&
          (err as { code: string }).code === "P2002"
            ? "Duplicate admission number"
            : "Failed to create student";
        results.push({
          row: i + 1,
          admissionNumber,
          studentName,
          status: "error",
          error: message,
        });
      }
    }

    const admin = getAdminFromRequest(request);
    if (admin && createdCount > 0) {
      await createAuditLog({
        action: "CREATE",
        entity: "Student",
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
    console.error("POST /api/students/import error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
