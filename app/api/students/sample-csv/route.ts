import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const headers = [
    "admissionNumber",
    "scholarNumber",
    "category",
    "caste",
    "penNumber",
    "aadhaarNumber",
    "whatsappNumber",
    "studentName",
    "fatherName",
    "motherName",
    "mobileNumber",
    "alternateMobile",
    "dateOfBirth",
    "gender",
    "className",
    "section",
    "address",
    "admissionDate",
    "status",
  ];

  const sampleRow = [
    "ADM001",
    "SCH001",
    "General",
    "",
    "",
    "",
    "",
    "Rahul Sharma",
    "Rajesh Sharma",
    "Sunita Sharma",
    "9876543210",
    "",
    "2015-06-15",
    "Male",
    "6",
    "A",
    "123 Main Street, City",
    "2025-04-01",
    "Active",
  ];

  const csvContent = [
    headers.join(","),
    sampleRow.map((cell) => `"${(cell ?? "").replace(/"/g, '""')}"`).join(","),
  ].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="students-sample.csv"',
    },
  });
}
