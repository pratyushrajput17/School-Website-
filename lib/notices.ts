import { prisma } from "./prisma";

export interface NoticeData {
  title: string;
  description: string;
  category: string;
}

export async function getNotices(options?: {
  category?: string;
  search?: string;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.category) {
    where.category = options.category;
  }

  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: "insensitive" } },
      { description: { contains: options.search, mode: "insensitive" } },
    ];
  }

  const notices = await prisma.notice.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: options?.limit,
  });

  return notices.map((n) => ({
    ...n,
    createdAt: n.createdAt.toISOString(),
  }));
}

export async function getNoticeById(id: string) {
  const notice = await prisma.notice.findUnique({ where: { id } });
  if (!notice) return null;
  return { ...notice, createdAt: notice.createdAt.toISOString() };
}

export async function createNotice(data: NoticeData) {
  const notice = await prisma.notice.create({ data });
  return { ...notice, createdAt: notice.createdAt.toISOString() };
}

export async function updateNotice(id: string, data: NoticeData) {
  const notice = await prisma.notice.update({
    where: { id },
    data,
  });
  return { ...notice, createdAt: notice.createdAt.toISOString() };
}

export async function deleteNotice(id: string) {
  await prisma.notice.delete({ where: { id } });
}

export async function getNoticeCount() {
  return prisma.notice.count();
}
