import { prisma } from "./prisma";

export interface HomeworkData {
  title: string;
  description: string;
  subjectId: string;
  teacherId: string;
  classId: string;
  sectionId: string;
  dueDate: string;
  attachmentUrl?: string;
  status?: string;
}

export async function getHomework(options?: {
  search?: string;
  classId?: string;
  sectionId?: string;
  subjectId?: string;
  teacherId?: string;
  status?: string;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: "insensitive" } },
      { description: { contains: options.search, mode: "insensitive" } },
    ];
  }

  if (options?.classId) where.classId = options.classId;
  if (options?.sectionId) where.sectionId = options.sectionId;
  if (options?.subjectId) where.subjectId = options.subjectId;
  if (options?.teacherId) where.teacherId = options.teacherId;
  if (options?.status) where.status = options.status;

  const homework = await prisma.homework.findMany({
    where,
    include: {
      subject: { select: { id: true, subjectName: true } },
      teacher: { select: { id: true, teacherName: true } },
      class: { select: { id: true, className: true } },
      section: { select: { id: true, sectionName: true } },
    },
    orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }],
    take: options?.limit,
  });

  return homework.map((h) => ({
    ...h,
    dueDate: h.dueDate.toISOString(),
    createdAt: h.createdAt.toISOString(),
  }));
}

export async function getHomeworkById(id: string) {
  const h = await prisma.homework.findUnique({
    where: { id },
    include: {
      subject: { select: { id: true, subjectName: true } },
      teacher: { select: { id: true, teacherName: true } },
      class: { select: { id: true, className: true } },
      section: { select: { id: true, sectionName: true } },
    },
  });
  if (!h) return null;
  return {
    ...h,
    dueDate: h.dueDate.toISOString(),
    createdAt: h.createdAt.toISOString(),
  };
}

export async function createHomework(data: HomeworkData) {
  const h = await prisma.homework.create({
    data: {
      title: data.title,
      description: data.description,
      subjectId: data.subjectId,
      teacherId: data.teacherId,
      classId: data.classId,
      sectionId: data.sectionId,
      dueDate: new Date(data.dueDate),
      attachmentUrl: data.attachmentUrl ?? null,
      status: data.status ?? "published",
    },
    include: {
      subject: { select: { id: true, subjectName: true } },
      teacher: { select: { id: true, teacherName: true } },
      class: { select: { id: true, className: true } },
      section: { select: { id: true, sectionName: true } },
    },
  });
  return {
    ...h,
    dueDate: h.dueDate.toISOString(),
    createdAt: h.createdAt.toISOString(),
  };
}

export async function updateHomework(id: string, data: Partial<HomeworkData>) {
  const updateData: Record<string, unknown> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.subjectId !== undefined) updateData.subjectId = data.subjectId;
  if (data.classId !== undefined) updateData.classId = data.classId;
  if (data.sectionId !== undefined) updateData.sectionId = data.sectionId;
  if (data.dueDate !== undefined) updateData.dueDate = new Date(data.dueDate);
  if (data.attachmentUrl !== undefined) updateData.attachmentUrl = data.attachmentUrl ?? null;
  if (data.status !== undefined) updateData.status = data.status;

  const h = await prisma.homework.update({
    where: { id },
    data: updateData,
    include: {
      subject: { select: { id: true, subjectName: true } },
      teacher: { select: { id: true, teacherName: true } },
      class: { select: { id: true, className: true } },
      section: { select: { id: true, sectionName: true } },
    },
  });
  return {
    ...h,
    dueDate: h.dueDate.toISOString(),
    createdAt: h.createdAt.toISOString(),
  };
}

export async function deleteHomework(id: string) {
  await prisma.homework.delete({ where: { id } });
}

export async function getHomeworkCount(options?: {
  classId?: string;
  teacherId?: string;
}) {
  const where: Record<string, unknown> = {};
  if (options?.classId) where.classId = options.classId;
  if (options?.teacherId) where.teacherId = options.teacherId;
  return prisma.homework.count({ where });
}

export async function getTeacherHomeworkSummary(teacherId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [total, todayCount, pendingCount] = await Promise.all([
    prisma.homework.count({ where: { teacherId } }),
    prisma.homework.count({
      where: { teacherId, dueDate: { gte: today, lt: tomorrow } },
    }),
    prisma.homework.count({
      where: { teacherId, dueDate: { gte: today }, status: "published" },
    }),
  ]);

  return { total, todayCount, pendingCount };
}
