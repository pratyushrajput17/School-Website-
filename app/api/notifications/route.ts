import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export async function POST(request: Request) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);

  if (!admin && !teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, title, message, parentId, studentId, classId, sectionId } = await request.json();

    if (!title || !message || !type) {
      return NextResponse.json({ error: "type, title, and message are required" }, { status: 400 });
    }

    const sentBy = admin ? `${admin.name} (${admin.role})` : teacher ? `${teacher.teacherName} (Teacher)` : "System";

    if (parentId) {
      const notification = await prisma.notification.create({
        data: { type, title, message, parentId, sentBy },
      });
      return NextResponse.json({ notification }, { status: 201 });
    }

    if (classId && sectionId) {
      const students = await prisma.student.findMany({
        where: { className: (await prisma.schoolClass.findUnique({ where: { id: classId } }))?.className || "", section: (await prisma.section.findUnique({ where: { id: sectionId } }))?.sectionName || "" },
      });
      const studentIds = students.map((s) => s.id);

      const parents = await prisma.parent.findMany({
        where: { studentId: { in: studentIds } },
      });

      const notifications = await Promise.all(
        parents.map((p) =>
          prisma.notification.create({
            data: { type, title, message, parentId: p.id, sentBy },
          })
        )
      );

      return NextResponse.json({ notifications, count: notifications.length }, { status: 201 });
    }

    const allParents = await prisma.parent.findMany({
      where: { status: "Active" },
    });

    const notifications = await Promise.all(
      allParents.map((p) =>
        prisma.notification.create({
          data: { type, title, message, parentId: p.id, sentBy },
        })
      )
    );

    return NextResponse.json({ notifications, count: notifications.length }, { status: 201 });
  } catch (error) {
    console.error("Send notification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
