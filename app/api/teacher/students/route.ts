import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const teacher = getTeacherFromRequest(request);
  if (!teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const classId = searchParams.get("classId");
  const sectionId = searchParams.get("sectionId");

  if (!classId || !sectionId) {
    return NextResponse.json({ error: "classId and sectionId are required" }, { status: 400 });
  }

  try {
    const assignment = await prisma.subjectAssignment.findFirst({
      where: { teacherId: teacher.id, classId, sectionId },
      include: { class: true, section: true },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Not authorized for this class/section" }, { status: 403 });
    }

    const students = await prisma.student.findMany({
      where: {
        className: { equals: assignment.class.className },
        section: { equals: assignment.section.sectionName },
        status: "Active",
      },
      select: {
        id: true,
        studentName: true,
        admissionNumber: true,
        className: true,
        section: true,
      },
      orderBy: [{ className: "asc" }, { studentName: "asc" }],
    });

    return NextResponse.json({ students });
  } catch (error) {
    console.error("GET /api/teacher/students error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}