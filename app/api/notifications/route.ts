import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import {
  createNotifications,
  getParentIdsForClassSection,
  getAllParentIds,
  getAllTeacherIds,
  getAllAdminIds,
  NOTIFICATION_TYPES,
  type NotificationType,
} from "@/lib/notifications";

export const runtime = "nodejs";

function normalizeType(value: string): string {
  const legacy: Record<string, NotificationType> = {
    homework: "HOMEWORK",
    attendance_alert: "GENERAL",
    holiday: "NOTICE",
    exam: "EVENT",
    notice: "NOTICE",
    event: "EVENT",
    general: "GENERAL",
  };
  if (legacy[value.toLowerCase()]) return legacy[value.toLowerCase()];
  const upper = value.toUpperCase();
  if ((NOTIFICATION_TYPES as readonly string[]).includes(upper)) return upper;
  return "GENERAL";
}

export async function POST(request: Request) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);

  if (!admin && !teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, message, type } = body;

    if (!title || !message || !type) {
      return NextResponse.json(
        { error: "type, title, and message are required" },
        { status: 400 }
      );
    }

    const sentBy = admin
      ? `${admin.name} (${admin.role})`
      : teacher
        ? `${teacher.teacherName} (Teacher)`
        : "System";

    const entityType = body.entityType || undefined;
    const entityId = body.entityId || undefined;
    const classId = body.classId || undefined;
    const sectionId = body.sectionId || undefined;

    let parentIds: string[] = Array.isArray(body.parentIds)
      ? body.parentIds
      : [];
    if (body.parentId) parentIds = [body.parentId];

    let teacherIds: string[] = Array.isArray(body.teacherIds)
      ? body.teacherIds
      : [];

    if (parentIds.length === 0 && classId && sectionId) {
      const [classRec, sectionRec] = await Promise.all([
        prisma.schoolClass.findUnique({ where: { id: classId } }),
        prisma.section.findUnique({ where: { id: sectionId } }),
      ]);
      if (classRec && sectionRec) {
        parentIds = await getParentIdsForClassSection(
          classRec.className,
          sectionRec.sectionName
        );
      }
    }

    if (parentIds.length === 0 && !body.teacherIds && !body.adminIds) {
      parentIds = await getAllParentIds();
    }

    if (body.notifyTeachers) {
      teacherIds = [...teacherIds, ...(await getAllTeacherIds())];
    }

    let adminIds: string[] = Array.isArray(body.adminIds)
      ? body.adminIds
      : [];
    if (body.notifyAdmins) {
      adminIds = await getAllAdminIds();
    }

    const rows = [
      ...parentIds.map((parentId) => ({
        type: normalizeType(type) as NotificationType,
        title,
        message,
        parentId,
        classId,
        sectionId,
        entityType,
        entityId,
        sentBy,
      })),
      ...teacherIds.map((teacherId) => ({
        type: normalizeType(type) as NotificationType,
        title,
        message,
        teacherId,
        entityType,
        entityId,
        sentBy,
      })),
      ...adminIds.map((adminId) => ({
        type: normalizeType(type) as NotificationType,
        title,
        message,
        adminId,
        entityType,
        entityId,
        sentBy,
      })),
    ];

    const count = await createNotifications(rows);

    return NextResponse.json({ count, notifications: rows }, { status: 201 });
  } catch (error) {
    console.error("Send notification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
