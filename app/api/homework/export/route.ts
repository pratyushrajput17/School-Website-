import { NextResponse } from "next/server";
import { getHomework } from "@/lib/homework";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get("classId") || undefined;
    const sectionId = searchParams.get("sectionId") || undefined;
    const subjectId = searchParams.get("subjectId") || undefined;
    const teacherId = searchParams.get("teacherId") || undefined;
    const status = searchParams.get("status") || undefined;

    const homework = await getHomework({
      classId, sectionId, subjectId, teacherId, status,
      limit: 10000,
    });

    const headers = [
      "Title", "Description", "Subject", "Teacher", "Class", "Section",
      "Due Date", "Attachment URL", "Status", "Created At",
    ];

    const rows = homework.map((h) => [
      h.title, h.description,
      h.subject?.subjectName || "", h.teacher?.teacherName || "",
      h.class?.className || "", h.section?.sectionName || "",
      new Date(h.dueDate).toLocaleDateString("en-IN"),
      h.attachmentUrl || "", h.status,
      new Date(h.createdAt).toLocaleDateString("en-IN"),
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
        "Content-Disposition": `attachment; filename="homework-export.csv"`,
      },
    });
  } catch (error) {
    console.error("GET /api/homework/export error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
