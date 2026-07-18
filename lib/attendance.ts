import { prisma } from "./prisma";

export interface AttendanceRecord {
  studentId: string;
  status: string;
  remarks?: string;
}

export async function getAttendance(options: {
  date?: string;
  startDate?: string;
  endDate?: string;
  className?: string;
  section?: string;
  studentId?: string;
  teacherId?: string;
  status?: string;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options.date) {
    const d = new Date(options.date);
    const start = new Date(d.setHours(0, 0, 0, 0));
    const end = new Date(d.setHours(23, 59, 59, 999));
    where.attendanceDate = { gte: start, lte: end };
  }

  if (options.startDate && options.endDate) {
    const start = new Date(options.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(options.endDate);
    end.setHours(23, 59, 59, 999);
    where.attendanceDate = { gte: start, lte: end };
  }

  if (options.className) where.className = options.className;
  if (options.section) where.section = options.section;
  if (options.studentId) where.studentId = options.studentId;
  if (options.teacherId) where.teacherId = options.teacherId;
  if (options.status) where.status = options.status;

  const records = await prisma.attendance.findMany({
    where,
    include: { student: { select: { studentName: true, admissionNumber: true } } },
    orderBy: [{ className: "asc" }, { section: "asc" }, { attendanceDate: "desc" }],
    take: options.limit,
  });

  return records.map((r) => ({
    ...r,
    attendanceDate: r.attendanceDate.toISOString(),
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function getAttendanceById(id: string) {
  const record = await prisma.attendance.findUnique({
    where: { id },
    include: { student: { select: { studentName: true, admissionNumber: true } } },
  });
  if (!record) return null;
  return {
    ...record,
    attendanceDate: record.attendanceDate.toISOString(),
    createdAt: record.createdAt.toISOString(),
  };
}

export async function upsertAttendance(
  studentId: string,
  teacherId: string,
  className: string,
  section: string,
  attendanceDate: string,
  status: string,
  remarks?: string
) {
  const date = new Date(attendanceDate);
  date.setHours(12, 0, 0, 0);

  const record = await prisma.attendance.upsert({
    where: {
      studentId_attendanceDate: { studentId, attendanceDate: date },
    },
    update: { status, remarks: remarks ?? "", teacherId, className, section },
    create: {
      studentId,
      teacherId,
      className,
      section,
      attendanceDate: date,
      status,
      remarks: remarks ?? "",
    },
  });

  return {
    ...record,
    attendanceDate: record.attendanceDate.toISOString(),
    createdAt: record.createdAt.toISOString(),
  };
}

export async function bulkMarkAttendance(
  teacherId: string,
  className: string,
  section: string,
  attendanceDate: string,
  records: { studentId: string; status: string; remarks?: string }[]
) {
  const results = [];
  for (const r of records) {
    const result = await upsertAttendance(
      r.studentId,
      teacherId,
      className,
      section,
      attendanceDate,
      r.status,
      r.remarks
    );
    results.push(result);
  }
  return results;
}

export async function deleteAttendance(id: string) {
  await prisma.attendance.delete({ where: { id } });
}

export async function getAttendanceStats(options: {
  date?: string;
  startDate?: string;
  endDate?: string;
  className?: string;
  section?: string;
}) {
  const where: Record<string, unknown> = {};

  if (options.date) {
    const d = new Date(options.date);
    const start = new Date(d.setHours(0, 0, 0, 0));
    const end = new Date(d.setHours(23, 59, 59, 999));
    where.attendanceDate = { gte: start, lte: end };
  }

  if (options.startDate && options.endDate) {
    const start = new Date(options.startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(options.endDate);
    end.setHours(23, 59, 59, 999);
    where.attendanceDate = { gte: start, lte: end };
  }

  if (options.className) where.className = options.className;
  if (options.section) where.section = options.section;

  const [total, present, absent, late, halfDay, leave] = await Promise.all([
    prisma.attendance.count({ where }),
    prisma.attendance.count({ where: { ...where, status: "Present" } }),
    prisma.attendance.count({ where: { ...where, status: "Absent" } }),
    prisma.attendance.count({ where: { ...where, status: "Late" } }),
    prisma.attendance.count({ where: { ...where, status: "Half Day" } }),
    prisma.attendance.count({ where: { ...where, status: "Leave" } }),
  ]);

  return {
    total,
    present,
    absent,
    late,
    halfDay,
    leave,
    percentage: total > 0 ? Math.round((present / total) * 100) : 0,
  };
}

export async function getTodaysAttendanceSummary() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return getAttendanceStats({
    startDate: today.toISOString(),
    endDate: tomorrow.toISOString(),
  });
}
