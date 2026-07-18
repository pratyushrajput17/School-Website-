import { NextResponse } from "next/server";
import { getStudents } from "@/lib/students";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get("className") || undefined;

    const students = await getStudents({ className });

    const headers = [
      "Admission Number",
      "Student Name",
      "Father Name",
      "Mobile Number",
      "Class",
      "Section",
      "Status",
    ];

    const rows = students.map((s) => [
      s.admissionNumber,
      s.studentName,
      s.fatherName,
      s.mobileNumber,
      s.className,
      s.section,
      s.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${(cell ?? "").replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const filename = className
      ? `students-class-${className}.csv`
      : "students-all.csv";

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("GET /api/students/export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
