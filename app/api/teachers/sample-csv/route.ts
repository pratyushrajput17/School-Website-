import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

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
  ];

  const sampleRow = [
    "TCH001",
    "Priya Sharma",
    "priya@school.com",
    "9876543210",
    "Mathematics",
    "6,7,8",
    "2023-04-01",
    "M.Sc. Mathematics",
    "123 Teacher Colony, City",
  ];

  const csvContent = [
    headers.join(","),
    sampleRow.map((cell) => `"${(cell ?? "").replace(/"/g, '""')}"`).join(","),
  ].join("\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="teachers-sample.csv"',
    },
  });
}
