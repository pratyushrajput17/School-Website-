import { prisma } from "./prisma";

export async function getStudentForParent(studentId: string) {
  return prisma.student.findUnique({
    where: { id: studentId },
  });
}

export async function getStudentAttendance(studentId: string) {
  const records = await prisma.attendance.findMany({
    where: { studentId },
    orderBy: { attendanceDate: "desc" },
  });

  const total = records.length;
  const present = records.filter((r) => r.status === "Present").length;
  const absent = records.filter((r) => r.status === "Absent").length;
  const late = records.filter((r) => r.status === "Late").length;
  const halfDay = records.filter((r) => r.status === "Half Day").length;
  const leave = records.filter((r) => r.status === "Leave").length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  const monthlyMap: Record<string, { present: number; absent: number; total: number }> = {};
  for (const r of records) {
    const key = new Date(r.attendanceDate).toLocaleDateString("en-IN", {
      month: "short", year: "numeric",
    });
    if (!monthlyMap[key]) monthlyMap[key] = { present: 0, absent: 0, total: 0 };
    monthlyMap[key].total++;
    if (r.status === "Present") monthlyMap[key].present++;
    if (r.status === "Absent") monthlyMap[key].absent++;
  }

  return { total, present, absent, late, halfDay, leave, percentage, monthly: monthlyMap };
}

export async function getHomeworkForStudent(className: string, section: string) {
  const classRec = await prisma.schoolClass.findFirst({ where: { className } });
  const sectionRec = await prisma.section.findFirst({ where: { sectionName: section } });
  if (!classRec || !sectionRec) return [];

  return prisma.homework.findMany({
    where: {
      classId: classRec.id,
      sectionId: sectionRec.id,
      status: "published",
    },
    include: { subject: true },
    orderBy: { dueDate: "desc" },
  });
}

export async function getNoticesForParent() {
  return prisma.notice.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export async function getEventsForParent() {
  const now = new Date();
  return prisma.event.findMany({
    where: { isPublished: true },
    orderBy: { eventDate: "asc" },
    take: 20,
  });
}

export async function getAchieversForParent() {
  return prisma.achiever.findMany({
    where: { isPublished: true },
    orderBy: [{ academicSession: "desc" }, { rank: "asc" }],
    take: 20,
  });
}

export async function getNotificationsForParent(parentId: string) {
  return prisma.notification.findMany({
    where: {
      OR: [
        { parentId },
        { parentId: null },
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function getUnreadNotificationCount(parentId: string) {
  return prisma.notification.count({
    where: { parentId, isRead: false },
  });
}

export async function markNotificationRead(id: string) {
  return prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
}
