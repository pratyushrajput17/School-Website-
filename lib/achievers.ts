import { prisma } from "./prisma";

export interface AchieverData {
  studentName: string;
  className: string;
  percentage: number;
  academicSession: number;
  rank?: number;
  photoUrl?: string;
  achievementTitle?: string;
  isPublished?: boolean;
  createdBy: string;
}

export interface UpdateAchieverData {
  studentName?: string;
  className?: string;
  percentage?: number;
  academicSession?: number;
  rank?: number;
  photoUrl?: string;
  achievementTitle?: string;
  isPublished?: boolean;
  updatedBy: string;
}

export async function getAchievers(options?: {
  search?: string;
  academicSession?: number;
  className?: string;
  limit?: number;
  publishedOnly?: boolean;
}) {
  const where: Record<string, unknown> = {};

  if (options?.publishedOnly) {
    where.isPublished = true;
  }

  if (options?.academicSession) {
    where.academicSession = options.academicSession;
  }

  if (options?.className) {
    where.className = options.className;
  }

  if (options?.search) {
    where.OR = [
      { studentName: { contains: options.search, mode: "insensitive" } },
      { className: { contains: options.search, mode: "insensitive" } },
      { achievementTitle: { contains: options.search, mode: "insensitive" } },
    ];
  }

  const achievers = await prisma.achiever.findMany({
    where,
    orderBy: [
      { academicSession: "desc" },
      { rank: "asc" },
      { percentage: "desc" },
    ],
    take: options?.limit,
  });

  return achievers.map((a) => ({
    id: a.id,
    studentName: a.studentName,
    className: a.className,
    percentage: Number(a.percentage),
    academicSession: a.academicSession,
    rank: a.rank,
    photoUrl: a.photoUrl,
    achievementTitle: a.achievementTitle,
    isPublished: a.isPublished,
    createdBy: a.createdBy,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));
}

export async function getAchieverById(id: string) {
  const achiever = await prisma.achiever.findUnique({ where: { id } });
  if (!achiever) return null;
  return {
    id: achiever.id,
    studentName: achiever.studentName,
    className: achiever.className,
    percentage: Number(achiever.percentage),
    academicSession: achiever.academicSession,
    rank: achiever.rank,
    photoUrl: achiever.photoUrl,
    achievementTitle: achiever.achievementTitle,
    isPublished: achiever.isPublished,
    createdBy: achiever.createdBy,
    createdAt: achiever.createdAt.toISOString(),
    updatedAt: achiever.updatedAt.toISOString(),
  };
}

export async function createAchiever(data: AchieverData) {
  const achiever = await prisma.achiever.create({
    data: {
      studentName: data.studentName,
      className: data.className,
      percentage: data.percentage,
      academicSession: data.academicSession,
      rank: data.rank ?? 0,
      photoUrl: data.photoUrl || null,
      achievementTitle: data.achievementTitle || "",
      isPublished: data.isPublished ?? false,
      createdBy: data.createdBy,
    },
  });
  return {
    id: achiever.id,
    studentName: achiever.studentName,
    className: achiever.className,
    percentage: Number(achiever.percentage),
    academicSession: achiever.academicSession,
    rank: achiever.rank,
    photoUrl: achiever.photoUrl,
    achievementTitle: achiever.achievementTitle,
    isPublished: achiever.isPublished,
    createdBy: achiever.createdBy,
    createdAt: achiever.createdAt.toISOString(),
    updatedAt: achiever.updatedAt.toISOString(),
  };
}

export async function updateAchiever(id: string, data: UpdateAchieverData) {
  const updateData: Record<string, unknown> = {
    updatedBy: data.updatedBy,
  };
  if (data.studentName !== undefined) updateData.studentName = data.studentName;
  if (data.className !== undefined) updateData.className = data.className;
  if (data.percentage !== undefined) updateData.percentage = data.percentage;
  if (data.academicSession !== undefined) updateData.academicSession = data.academicSession;
  if (data.rank !== undefined) updateData.rank = data.rank;
  if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl || null;
  if (data.achievementTitle !== undefined) updateData.achievementTitle = data.achievementTitle;
  if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

  const achiever = await prisma.achiever.update({
    where: { id },
    data: updateData,
  });
  return {
    id: achiever.id,
    studentName: achiever.studentName,
    className: achiever.className,
    percentage: Number(achiever.percentage),
    academicSession: achiever.academicSession,
    rank: achiever.rank,
    photoUrl: achiever.photoUrl,
    achievementTitle: achiever.achievementTitle,
    isPublished: achiever.isPublished,
    createdBy: achiever.createdBy,
    createdAt: achiever.createdAt.toISOString(),
    updatedAt: achiever.updatedAt.toISOString(),
  };
}

export async function deleteAchiever(id: string) {
  await prisma.achiever.delete({ where: { id } });
}

export async function getAchieverCount() {
  return prisma.achiever.count();
}

export async function getAchieverSessions() {
  const result = await prisma.achiever.findMany({
    select: { academicSession: true },
    distinct: ["academicSession"],
    orderBy: { academicSession: "desc" },
  });
  return result.map((r) => r.academicSession);
}

export async function getAchieverClasses() {
  const result = await prisma.achiever.findMany({
    select: { className: true },
    distinct: ["className"],
    orderBy: { className: "asc" },
  });
  return result.map((r) => r.className);
}
