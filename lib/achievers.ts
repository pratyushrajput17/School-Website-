import { prisma } from "./prisma";

export interface AchieverData {
  name: string;
  className: string;
  percentage: number;
  year: number;
  photo?: string;
}

export async function getAchievers(options?: {
  search?: string;
  year?: number;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.search) {
    where.OR = [
      { name: { contains: options.search, mode: "insensitive" } },
      { className: { contains: options.search, mode: "insensitive" } },
    ];
  }

  if (options?.year) {
    where.year = options.year;
  }

  const achievers = await prisma.achiever.findMany({
    where,
    orderBy: [{ year: "desc" }, { percentage: "desc" }],
    take: options?.limit,
  });

  return achievers.map((a) => ({
    ...a,
    percentage: Number(a.percentage),
    createdAt: a.createdAt.toISOString(),
  }));
}

export async function getAchieverById(id: string) {
  const achiever = await prisma.achiever.findUnique({ where: { id } });
  if (!achiever) return null;
  return {
    ...achiever,
    percentage: Number(achiever.percentage),
    createdAt: achiever.createdAt.toISOString(),
  };
}

export async function createAchiever(data: AchieverData) {
  const achiever = await prisma.achiever.create({
    data: {
      name: data.name,
      className: data.className,
      percentage: data.percentage,
      year: data.year,
      photo: data.photo || null,
    },
  });
  return {
    ...achiever,
    percentage: Number(achiever.percentage),
    createdAt: achiever.createdAt.toISOString(),
  };
}

export async function updateAchiever(id: string, data: AchieverData) {
  const achiever = await prisma.achiever.update({
    where: { id },
    data: {
      name: data.name,
      className: data.className,
      percentage: data.percentage,
      year: data.year,
      photo: data.photo || null,
    },
  });
  return {
    ...achiever,
    percentage: Number(achiever.percentage),
    createdAt: achiever.createdAt.toISOString(),
  };
}

export async function deleteAchiever(id: string) {
  await prisma.achiever.delete({ where: { id } });
}

export async function getAchieverCount() {
  return prisma.achiever.count();
}

export async function getAchieverYears() {
  const result = await prisma.achiever.findMany({
    select: { year: true },
    distinct: ["year"],
    orderBy: { year: "desc" },
  });
  return result.map((r) => r.year);
}
