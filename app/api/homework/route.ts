import { NextResponse } from "next/server";
import {
  getHomework,
  createHomework,
  getHomeworkCount,
} from "@/lib/homework";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { prisma } from "@/lib/prisma";
import { sendHomeworkNotification } from "@/lib/notifications";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const teacherId = teacher?.id || undefined;
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const classId = searchParams.get("classId") || undefined;
  const sectionId = searchParams.get("sectionId") || undefined;
  const subjectId = searchParams.get("subjectId") || undefined;
  const requestedTeacherId = searchParams.get("teacherId") || undefined;
  const status = searchParams.get("status") || undefined;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : undefined;

  const effectiveTeacherId = admin ? requestedTeacherId : teacherId;

  try {
    const homework = await getHomework({
      search, classId, sectionId, subjectId,
      teacherId: effectiveTeacherId,
      status, limit,
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

    if (homework.status === "published") {
      const [classRec, sectionRec, subjectRec] = await Promise.all([
        prisma.schoolClass.findUnique({ where: { id: classId } }),
        prisma.section.findUnique({ where: { id: sectionId } }),
        prisma.subject.findUnique({ where: { id: subjectId } }),
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
          classId,
          sectionId,
        });
      }
    }

    return NextResponse.json({ homework }, { status: 201 });
  } catch (error) {
    console.error("POST /api/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
