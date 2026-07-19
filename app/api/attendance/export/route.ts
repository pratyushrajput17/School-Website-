import { NextResponse } from "next/server";
import { getAttendance } from "@/lib/attendance";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const className = searchParams.get("className") || undefined;
    const section = searchParams.get("section") || undefined;
    const status = searchParams.get("status") || undefined;

    const records = await getAttendance({
      startDate, endDate, className, section, status,
      limit: 10000,
    });

    const headers = [
      "Student Name",
      "Admission Number",
      "Class",
      "Section",
      "Date",
      "Status",
      "Remarks",
    ];

    const rows = records.map((r) => [
      r.student?.studentName || "",
      r.student?.admissionNumber || "",
      r.className,
      r.section,
      new Date(r.attendanceDate).toLocaleDateString("en-IN"),
      r.status,
      r.remarks,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="attendance-export.csv"`,
      },
    });
  } catch (error) {
    console.error("GET /api/attendance/export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
