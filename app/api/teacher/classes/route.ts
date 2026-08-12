import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const teacher = getTeacherFromRequest(request);
  if (!teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const assignments = await prisma.subjectAssignment.findMany({
      where: { teacherId: teacher.id },
      include: {
        class: { select: { id: true, className: true } },
        section: { select: { id: true, sectionName: true } },
        subject: { select: { id: true, subjectName: true } },
      },
    });

    const classes = assignments.map((a) => ({
      classId: a.class.id,
      className: a.class.className,
      sectionId: a.section.id,
      sectionName: a.section.sectionName,
      subjectId: a.subject.id,
      subjectName: a.subject.subjectName,
    }));

    return NextResponse.json({ classes });
  } catch (error) {
    console.error("GET /api/teacher/classes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}