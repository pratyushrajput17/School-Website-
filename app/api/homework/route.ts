import { NextResponse } from "next/server";
import {
  getHomework,
  createHomework,
  getHomeworkCount,
} from "@/lib/homework";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const classId = searchParams.get("classId") || undefined;
  const sectionId = searchParams.get("sectionId") || undefined;
  const subjectId = searchParams.get("subjectId") || undefined;
  const teacherId = searchParams.get("teacherId") || undefined;
  const status = searchParams.get("status") || undefined;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : undefined;

  try {
    const homework = await getHomework({
      search, classId, sectionId, subjectId, teacherId, status, limit,
    });
    const total = await getHomeworkCount();

    return NextResponse.json({ homework, total });
  } catch (error) {
    console.error("GET /api/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);

  if (!admin && !teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, subjectId, classId, sectionId, dueDate, attachmentUrl, status } = body;

    if (!title || !description || !subjectId || !classId || !sectionId || !dueDate) {
      return NextResponse.json(
        { error: "title, description, subjectId, classId, sectionId, and dueDate are required" },
        { status: 400 }
      );
    }

    const teacherId = teacher ? teacher.id : (admin ? admin.id : "");

    const homework = await createHomework({
      title, description, subjectId, teacherId, classId, sectionId, dueDate,
      attachmentUrl: attachmentUrl || undefined,
      status: status || "published",
    });

    return NextResponse.json({ homework }, { status: 201 });
  } catch (error) {
    console.error("POST /api/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
