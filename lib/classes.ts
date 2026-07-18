import { prisma } from "./prisma";

export async function getClasses() {
  const classes = await prisma.schoolClass.findMany({
    orderBy: { createdAt: "asc" },
  });
  return classes;
}

export async function getClassById(id: string) {
  return prisma.schoolClass.findUnique({ where: { id } });
}

export async function createClass(className: string) {
  return prisma.schoolClass.create({ data: { className } });
}

export async function updateClass(id: string, data: { className?: string; status?: string }) {
  return prisma.schoolClass.update({ where: { id }, data });
}

export async function deleteClass(id: string) {
  await prisma.schoolClass.delete({ where: { id } });
}

export async function getClassCount() {
  return prisma.schoolClass.count();
}
