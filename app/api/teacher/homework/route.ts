import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { getHomework, createHomework } from "@/lib/homework";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const teacher = getTeacherFromRequest(request);
  if (!teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const classId = searchParams.get("classId") || undefined;
  const sectionId = searchParams.get("sectionId") || undefined;
  const subjectId = searchParams.get("subjectId") || undefined;
  const status = searchParams.get("status") || undefined;
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;

  try {
    const homework = await getHomework({
      search, classId, sectionId, subjectId, teacherId: teacher.id, status, limit,
    });

    return NextResponse.json({ homework });
  } catch (error) {
    console.error("GET /api/teacher/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const teacher = getTeacherFromRequest(request);
  if (!teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, subjectId, classId, sectionId, dueDate, attachmentUrl, status } = await request.json();

    if (!title || !description || !subjectId || !classId || !sectionId || !dueDate) {
      return NextResponse.json(
        { error: "title, description, subjectId, classId, sectionId, and dueDate are required" },
        { status: 400 }
      );
    }

    const assignment = await prisma.subjectAssignment.findFirst({
      where: { teacherId: teacher.id, classId, sectionId, subjectId },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Not authorized for this class/section/subject" }, { status: 403 });
    }

    const homework = await createHomework({
      title, description, subjectId, teacherId: teacher.id, classId, sectionId, dueDate,
      attachmentUrl: attachmentUrl || undefined,
      status: status || "published",
    });

    return NextResponse.json({ homework }, { status: 201 });
  } catch (error) {
    console.error("POST /api/teacher/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}