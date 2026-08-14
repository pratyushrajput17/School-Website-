import { prisma } from "./prisma";

export const NOTIFICATION_TYPES = [
  "NOTICE",
  "HOMEWORK",
  "EVENT",
  "GENERAL",
] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export interface NotificationRecipient {
  parentId?: string;
  teacherId?: string;
  adminId?: string;
}

export interface NotificationRow {
  type: NotificationType;
  title: string;
  message: string;
  parentId?: string;
  teacherId?: string;
  adminId?: string;
  studentId?: string;
  classId?: string;
  sectionId?: string;
  entityType?: string;
  entityId?: string;
  sentBy: string;
}

function recipientFilter(recipient: NotificationRecipient) {
  const filter: Record<string, string> = {};
  if (recipient.parentId) filter.parentId = recipient.parentId;
  if (recipient.teacherId) filter.teacherId = recipient.teacherId;
  if (recipient.adminId) filter.adminId = recipient.adminId;

  if (Object.keys(filter).length === 0) {
    throw new Error("At least one recipient reference is required");
  }
  return filter;
}

export function serializeNotification(n: {
  id: string;
  type: string;
  title: string;
  message: string;
  parentId: string | null;
  teacherId: string | null;
  adminId: string | null;
  studentId: string | null;
  classId: string | null;
  sectionId: string | null;
  entityType: string | null;
  entityId: string | null;
  sentBy: string;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
}) {
  return {
    id: n.id,
    type: n.type,
    title: n.title,
    message: n.message,
    parentId: n.parentId,
    teacherId: n.teacherId,
    adminId: n.adminId,
    studentId: n.studentId,
    classId: n.classId,
    sectionId: n.sectionId,
    entityType: n.entityType,
    entityId: n.entityId,
    sentBy: n.sentBy,
    isRead: n.isRead,
    readAt: n.readAt?.toISOString() ?? null,
    createdAt: n.createdAt.toISOString(),
  };
}

export async function getNotifications(
  recipient: NotificationRecipient,
  options?: { limit?: number; onlyUnread?: boolean; onlyRead?: boolean }
) {
  const where: Record<string, unknown> = recipientFilter(recipient);
  if (options?.onlyUnread) where.isRead = false;
  if (options?.onlyRead) where.isRead = true;

  const notifications = await prisma.notification.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: options?.limit ?? 50,
  });

  return notifications.map(serializeNotification);
}

export async function getUnreadCount(recipient: NotificationRecipient) {
  return prisma.notification.count({
    where: { ...recipientFilter(recipient), isRead: false },
  });
}

/**
 * Marks a notification as read ONLY if it belongs to the given recipient.
 * Returns false when the notification does not exist or does not belong
 * to the caller (data isolation).
 */
export async function markAsRead(id: string, recipient: NotificationRecipient) {
  const result = await prisma.notification.updateMany({
    where: { id, ...recipientFilter(recipient), isRead: false },
    data: { isRead: true, readAt: new Date() },
  });
  return result.count > 0;
}

export async function markAllAsRead(recipient: NotificationRecipient) {
  const result = await prisma.notification.updateMany({
    where: { ...recipientFilter(recipient), isRead: false },
    data: { isRead: true, readAt: new Date() },
  });
  return result.count;
}

/**
 * Bulk-creates notifications in a single batch operation.
 * Returns the number of rows created.
 */
export async function createNotifications(rows: NotificationRow[]) {
  if (rows.length === 0) return 0;
  const result = await prisma.notification.createMany({
    data: rows.map((r) => ({
      type: r.type,
      title: r.title,
      message: r.message,
      parentId: r.parentId ?? null,
      teacherId: r.teacherId ?? null,
      adminId: r.adminId ?? null,
      studentId: r.studentId ?? null,
      classId: r.classId ?? null,
      sectionId: r.sectionId ?? null,
      entityType: r.entityType ?? null,
      entityId: r.entityId ?? null,
      sentBy: r.sentBy,
    })),
  });
  return result.count;
}

/** Parent IDs for every Active parent whose child is in the given class/section. */
export async function getParentIdsForClassSection(
  className: string,
  sectionName: string
) {
  const students = await prisma.student.findMany({
    where: { className, section: sectionName, status: "Active" },
    select: { id: true },
  });
  const studentIds = students.map((s) => s.id);
  if (studentIds.length === 0) return [];

  const parents = await prisma.parent.findMany({
    where: { studentId: { in: studentIds }, status: "Active" },
    select: { id: true },
  });
  return parents.map((p) => p.id);
}

/** All Active parent IDs. */
export async function getAllParentIds() {
  const parents = await prisma.parent.findMany({
    where: { status: "Active" },
    select: { id: true },
  });
  return parents.map((p) => p.id);
}

/** All Active teacher IDs. */
export async function getAllTeacherIds() {
  const teachers = await prisma.teacher.findMany({
    where: { status: "Active" },
    select: { id: true },
  });
  return teachers.map((t) => t.id);
}

/** All Active admin IDs (used only by super_admin flows). */
export async function getAllAdminIds() {
  const admins = await prisma.admin.findMany({
    where: { status: "Active" },
    select: { id: true },
  });
  return admins.map((a) => a.id);
}

export interface AudienceOptions {
  notifyParents?: boolean;
  notifyTeachers?: boolean;
}

/**
 * Sends a notice/event style notification to an explicit audience.
 * Audience is opt-in only — nothing is sent unless a flag is true.
 */
export async function sendContentNotification(params: {
  type: NotificationType;
  title: string;
  message: string;
  sentBy: string;
  entityType?: string;
  entityId?: string;
  classId?: string;
  sectionId?: string;
  className?: string;
  sectionName?: string;
  parentIds?: string[];
  audience?: AudienceOptions;
}) {
  const {
    type,
    title,
    message,
    sentBy,
    entityType,
    entityId,
    classId,
    sectionId,
    className,
    sectionName,
    parentIds,
    audience,
  } = params;

  let parentRecipients: string[] = parentIds ?? [];

  if (audience?.notifyParents && parentRecipients.length === 0) {
    if (className && sectionName) {
      parentRecipients = await getParentIdsForClassSection(
        className,
        sectionName
      );
    } else {
      parentRecipients = await getAllParentIds();
    }
  }

  let teacherRecipients: string[] = [];
  if (audience?.notifyTeachers) {
    teacherRecipients = await getAllTeacherIds();
  }

  const rows: NotificationRow[] = [
    ...parentRecipients.map((parentId) => ({
      type,
      title,
      message,
      parentId,
      classId,
      sectionId,
      entityType,
      entityId,
      sentBy,
    })),
    ...teacherRecipients.map((teacherId) => ({
      type,
      title,
      message,
      teacherId,
      entityType,
      entityId,
      sentBy,
    })),
  ];

  return createNotifications(rows);
}

/**
 * Sends homework notifications to parents whose child is in the given
 * class/section. No unrelated parents are notified.
 */
export async function sendHomeworkNotification(params: {
  title: string;
  message: string;
  sentBy: string;
  entityId?: string;
  className: string;
  sectionName: string;
  classId?: string;
  sectionId?: string;
  studentId?: string;
}) {
  const parentIds = await getParentIdsForClassSection(
    params.className,
    params.sectionName
  );

  const rows: NotificationRow[] = parentIds.map((parentId) => ({
    type: "HOMEWORK",
    title: params.title,
    message: params.message,
    parentId,
    classId: params.classId,
    sectionId: params.sectionId,
    studentId: params.studentId,
    entityType: "HOMEWORK",
    entityId: params.entityId,
    sentBy: params.sentBy,
  }));

  return createNotifications(rows);
}
