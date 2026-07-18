import { NextResponse } from "next/server";
import { getHomeworkById, updateHomework, deleteHomework } from "@/lib/homework";
import { requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const homework = await getHomeworkById(id);
    if (!homework) {
      return NextResponse.json({ error: "Homework not found" }, { status: 404 });
    }
    return NextResponse.json({ homework });
  } catch (error) {
    console.error("GET /api/homework/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getTeacherFromRequest(request) || requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  try {
    const existing = await getHomeworkById(id);
    if (!existing) {
      return NextResponse.json({ error: "Homework not found" }, { status: 404 });
    }

    const teacher = getTeacherFromRequest(request);
    if (teacher) {
      const assigned = (teacher.assignedClasses || "").split(",").map((c) => c.trim());
      if (!assigned.includes(existing.className)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const homework = await updateHomework(id, {
      title: body.title,
      description: body.description,
      subject: body.subject,
      className: body.className,
      section: body.section,
      dueDate: body.dueDate,
      attachmentUrl: body.attachmentUrl,
    });

    return NextResponse.json({ homework });
  } catch (error) {
    console.error("PUT /api/homework/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getTeacherFromRequest(request) || requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const existing = await getHomeworkById(id);
    if (!existing) {
      return NextResponse.json({ error: "Homework not found" }, { status: 404 });
    }

    const teacher = getTeacherFromRequest(request);
    if (teacher) {
      const assigned = (teacher.assignedClasses || "").split(",").map((c) => c.trim());
      if (!assigned.includes(existing.className)) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    await deleteHomework(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/homework/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
