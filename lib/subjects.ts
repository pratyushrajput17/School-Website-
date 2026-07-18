import { prisma } from "./prisma";

export async function getSubjects() {
  return prisma.subject.findMany({ orderBy: { subjectName: "asc" } });
}

export async function getSubjectById(id: string) {
  return prisma.subject.findUnique({ where: { id } });
}

export async function createSubject(data: { subjectName: string; subjectCode?: string }) {
  return prisma.subject.create({ data: { subjectName: data.subjectName, subjectCode: data.subjectCode ?? "" } });
}

export async function updateSubject(id: string, data: { subjectName?: string; subjectCode?: string; status?: string }) {
  return prisma.subject.update({ where: { id }, data });
}

export async function deleteSubject(id: string) {
  await prisma.subject.delete({ where: { id } });
}

export async function getSubjectCount() {
  return prisma.subject.count();
}
