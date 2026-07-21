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
    const section = searchParams.get("section") || undefined;

    const students = await getStudents({ className, section });

    const headers = [
      "Admission Number",
      "Scholar Number",
      "Category",
      "Caste",
      "PEN Number",
      "Aadhaar Number",
      "WhatsApp Number",
      "Student Name",
      "Father Name",
      "Mother Name",
      "Mobile Number",
      "Alternate Mobile",
      "Date of Birth",
      "Gender",
      "Class",
      "Section",
      "Address",
      "Admission Date",
      "Status",
    ];

    const rows = students.map((s) => [
      s.admissionNumber,
      s.scholarNumber || "",
      s.category || "General",
      s.caste || "",
      s.penNumber || "",
      s.aadhaarNumber || "",
      s.whatsappNumber || "",
      s.studentName,
      s.fatherName,
      s.motherName,
      s.mobileNumber,
      s.alternateMobile || "",
      s.dateOfBirth.split("T")[0],
      s.gender,
      s.className,
      s.section,
      s.address,
      s.admissionDate.split("T")[0],
      s.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${(cell ?? "").replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    let filename = "students-all.csv";
    if (className && section) {
      filename = `students-class-${className}-section-${section}.csv`;
    } else if (className) {
      filename = `students-class-${className}.csv`;
    } else if (section) {
      filename = `students-section-${section}.csv`;
    }

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
