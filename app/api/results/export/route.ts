import { NextResponse } from "next/server";
import { getResults } from "@/lib/results";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const examId = searchParams.get("examId") || undefined;
    const classId = searchParams.get("classId") || undefined;

    if (!examId) {
      return NextResponse.json({ error: "examId is required" }, { status: 400 });
    }

    const results = await getResults({ examId, classId });

    const headers = [
      "Student Name",
      "Admission No",
      "Class",
      "Section",
      "Subject",
      "Marks Obtained",
      "Max Marks",
      "Percentage",
      "Grade",
    ];

    type ResultRow = { student: { studentName: string; admissionNumber: string; className: string; section: string } | null; subject: { subjectName: string } | null; marksObtained: number; maximumMarks: number; percentage: number; grade: string | null };
    const typedResults = results as ResultRow[];
    const rows: (string | number)[][] = typedResults.map((r: ResultRow) => [
      r.student?.studentName || "",
      r.student?.admissionNumber || "",
      r.student?.className || "",
      r.student?.section || "",
      r.subject?.subjectName || "",
      r.marksObtained,
      r.maximumMarks,
      r.percentage,
      r.grade || "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row: (string | number)[]) =>
        row.map((cell: string | number) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="results-export.csv"`,
      },
    });
  } catch (error) {
    console.error("GET /api/results/export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
