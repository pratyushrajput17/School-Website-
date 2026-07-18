import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

export interface NoticeData {
  title: string;
  description: string;
  category: string;
  isPublished?: boolean;
  createdBy: string;
}

export interface UpdateNoticeData {
  title?: string;
  description?: string;
  category?: string;
  isPublished?: boolean;
  updatedBy: string;
}

export async function getNotices(options?: {
  category?: string;
  search?: string;
  limit?: number;
  publishedOnly?: boolean;
}) {
  const where: Record<string, unknown> = {};

  if (options?.publishedOnly) {
    where.isPublished = true;
  }

  if (options?.category) {
    where.category = options.category;
  }

  if (options?.search) {
    where.OR = [
      { title: { contains: options.search, mode: Prisma.QueryMode.insensitive } },
      { description: { contains: options.search, mode: Prisma.QueryMode.insensitive } },
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
    updatedAt: n.updatedAt.toISOString(),
  }));
}

export async function getNoticeById(id: string) {
  const notice = await prisma.notice.findUnique({ where: { id } });
  if (!notice) return null;
  return {
    ...notice,
    createdAt: notice.createdAt.toISOString(),
    updatedAt: notice.updatedAt.toISOString(),
  };
}

export async function createNotice(data: NoticeData) {
  const notice = await prisma.notice.create({
    data: {
      title: data.title,
      description: data.description,
      category: data.category,
      isPublished: data.isPublished ?? false,
      createdBy: data.createdBy,
    },
  });
  return {
    ...notice,
    createdAt: notice.createdAt.toISOString(),
    updatedAt: notice.updatedAt.toISOString(),
  };
}

export async function updateNotice(id: string, data: UpdateNoticeData) {
  const updateData: Record<string, unknown> = {
    updatedBy: data.updatedBy,
  };
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

  const notice = await prisma.notice.update({
    where: { id },
    data: updateData,
  });
  return {
    ...notice,
    createdAt: notice.createdAt.toISOString(),
    updatedAt: notice.updatedAt.toISOString(),
  };
}

export async function deleteNotice(id: string) {
  await prisma.notice.delete({ where: { id } });
}

export async function getNoticeCount() {
  return prisma.notice.count();
}
