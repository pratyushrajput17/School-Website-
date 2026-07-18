import { NextResponse } from "next/server";
import { getTeachers } from "@/lib/teachers";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const subject = searchParams.get("subject") || undefined;
    const assignedClass = searchParams.get("assignedClass") || undefined;

    const teachers = await getTeachers({ subject, assignedClass });

    const headers = [
      "Employee ID",
      "Teacher Name",
      "Email",
      "Phone",
      "Subject",
      "Assigned Classes",
      "Joining Date",
      "Qualification",
      "Address",
      "Status",
    ];

    const rows = teachers.map((t) => [
      t.employeeId,
      t.teacherName,
      t.email,
      t.phone,
      t.subject,
      t.assignedClasses || "",
      t.joiningDate.split("T")[0],
      t.qualification,
      t.address,
      t.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${(cell ?? "").replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    let filename = "teachers-all.csv";
    if (subject) {
      filename = `teachers-subject-${subject.replace(/\s+/g, "-").toLowerCase()}.csv`;
    } else if (assignedClass) {
      filename = `teachers-class-${assignedClass}.csv`;
    }

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("GET /api/teachers/export error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
