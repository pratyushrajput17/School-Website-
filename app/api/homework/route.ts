import { NextResponse } from "next/server";
import {
  getHomework,
  createHomework,
  getHomeworkCount,
  getHomeworkSubjects,
} from "@/lib/homework";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const className = searchParams.get("className") || undefined;
  const section = searchParams.get("section") || undefined;
  const subject = searchParams.get("subject") || undefined;
  const createdBy = searchParams.get("createdBy") || undefined;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : undefined;

  try {
    const homework = await getHomework({
      search, className, section, subject, createdBy, limit,
    });
    const total = await getHomeworkCount();
    const subjects = await getHomeworkSubjects();

    return NextResponse.json({ homework, total, subjects });
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
    const { title, description, subject, className, section, dueDate, attachmentUrl } = body;

    if (!title || !description || !subject || !className || !section || !dueDate) {
      return NextResponse.json(
        { error: "title, description, subject, className, section, and dueDate are required" },
        { status: 400 }
      );
    }

    if (teacher) {
      const assigned = (teacher.assignedClasses || "").split(",").map((c) => c.trim());
      if (!assigned.includes(className)) {
        return NextResponse.json(
          { error: "You are not assigned to this class" },
          { status: 403 }
        );
      }
    }

    const createdBy = teacher ? teacher.id : admin!.id;

    const homework = await createHomework({
      title, description, subject, className, section, dueDate,
      attachmentUrl: attachmentUrl || undefined,
      createdBy,
    });

    return NextResponse.json({ homework }, { status: 201 });
  } catch (error) {
    console.error("POST /api/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
