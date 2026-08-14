import { NextResponse } from "next/server";
import { getHomeworkById, updateHomework, deleteHomework } from "@/lib/homework";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { prisma } from "@/lib/prisma";
import { sendHomeworkNotification } from "@/lib/notifications";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  try {
    const existing = await getHomeworkById(id);
    if (!existing) {
      return NextResponse.json({ error: "Homework not found" }, { status: 404 });
    }

    const homework = await updateHomework(id, {
      title: body.title,
      description: body.description,
      subjectId: body.subjectId,
      classId: body.classId,
      sectionId: body.sectionId,
      dueDate: body.dueDate,
      attachmentUrl: body.attachmentUrl,
      status: body.status,
    });

    const wasPublished = existing.status === "published";
    const nowPublished = homework.status === "published";

    if (nowPublished && !wasPublished && homework.classId && homework.sectionId) {
      const [classRec, sectionRec, subjectRec] = await Promise.all([
        prisma.schoolClass.findUnique({ where: { id: homework.classId } }),
        prisma.section.findUnique({ where: { id: homework.sectionId } }),
        prisma.subject.findUnique({ where: { id: homework.subjectId } }),
      ]);

      if (classRec && sectionRec) {
        const senderName = teacher?.teacherName || admin?.name || "School";
        await sendHomeworkNotification({
          title: `Homework: ${homework.title}`,
          message: `${subjectRec?.subjectName || "Subject"} homework for Class ${classRec.className}-${sectionRec.sectionName}. Due by ${new Date(homework.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}.`,
          sentBy: `${senderName} (Teacher)`,
          entityId: homework.id,
          className: classRec.className,
          sectionName: sectionRec.sectionName,
          classId: homework.classId,
          sectionId: homework.sectionId,
        });
      }
    }

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
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const existing = await getHomeworkById(id);
    if (!existing) {
      return NextResponse.json({ error: "Homework not found" }, { status: 404 });
    }

    await deleteHomework(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/homework/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
