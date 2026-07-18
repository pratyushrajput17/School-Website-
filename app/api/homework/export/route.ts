import { NextResponse } from "next/server";
import { getHomework } from "@/lib/homework";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get("className") || undefined;
    const section = searchParams.get("section") || undefined;
    const subject = searchParams.get("subject") || undefined;

    const homework = await getHomework({
      className, section, subject,
      limit: 10000,
    });

    const headers = [
      "Title",
      "Description",
      "Subject",
      "Class",
      "Section",
      "Due Date",
      "Attachment URL",
      "Created At",
    ];

    const rows = homework.map((h) => [
      h.title,
      h.description,
      h.subject,
      h.className,
      h.section,
      new Date(h.dueDate).toLocaleDateString("en-IN"),
      h.attachmentUrl || "",
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
