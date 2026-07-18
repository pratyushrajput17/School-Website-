import { prisma } from "./prisma";

export async function getSections() {
  return prisma.section.findMany({ orderBy: { sectionName: "asc" } });
}

export async function getSectionById(id: string) {
  return prisma.section.findUnique({ where: { id } });
}

export async function createSection(sectionName: string) {
  return prisma.section.create({ data: { sectionName } });
}

export async function updateSection(id: string, data: { sectionName?: string; status?: string }) {
  return prisma.section.update({ where: { id }, data });
}

export async function deleteSection(id: string) {
  await prisma.section.delete({ where: { id } });
}

export async function getSectionCount() {
  return prisma.section.count();
}
