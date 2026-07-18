import { prisma } from "./prisma";

export interface HomeworkData {
  title: string;
  description: string;
  subject: string;
  className: string;
  section: string;
  dueDate: string;
  attachmentUrl?: string;
  createdBy: string;
}

export async function getHomework(options?: {
  search?: string;
  className?: string;
  section?: string;
  subject?: string;
  createdBy?: string;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: "insensitive" } },
      { description: { contains: options.search, mode: "insensitive" } },
      { subject: { contains: options.search, mode: "insensitive" } },
    ];
  }

  if (options?.className) where.className = options.className;
  if (options?.section) where.section = options.section;
  if (options?.subject) where.subject = options.subject;
  if (options?.createdBy) where.createdBy = options.createdBy;

  const homework = await prisma.homework.findMany({
    where,
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
  const h = await prisma.homework.findUnique({ where: { id } });
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
      subject: data.subject,
      className: data.className,
      section: data.section,
      dueDate: new Date(data.dueDate),
      attachmentUrl: data.attachmentUrl ?? null,
      createdBy: data.createdBy,
    },
  });
  return {
    ...h,
    dueDate: h.dueDate.toISOString(),
    createdAt: h.createdAt.toISOString(),
  };
}

export async function updateHomework(
  id: string,
  data: Partial<HomeworkData>
) {
  const updateData: Record<string, unknown> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.subject !== undefined) updateData.subject = data.subject;
  if (data.className !== undefined) updateData.className = data.className;
  if (data.section !== undefined) updateData.section = data.section;
  if (data.dueDate !== undefined) updateData.dueDate = new Date(data.dueDate);
  if (data.attachmentUrl !== undefined) updateData.attachmentUrl = data.attachmentUrl ?? null;

  const h = await prisma.homework.update({ where: { id }, data: updateData });
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
  className?: string;
  subject?: string;
}) {
  const where: Record<string, unknown> = {};
  if (options?.className) where.className = options.className;
  if (options?.subject) where.subject = options.subject;
  return prisma.homework.count({ where });
}

export async function getHomeworkSubjects() {
  const result = await prisma.homework.findMany({
    select: { subject: true },
    distinct: ["subject"],
    orderBy: { subject: "asc" },
  });
  return result.map((r) => r.subject);
}
