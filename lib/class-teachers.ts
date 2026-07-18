import { prisma } from "./prisma";

export async function getClassTeachers() {
  return prisma.classTeacher.findMany({
    include: {
      class: true,
      section: true,
      teacher: { select: { id: true, teacherName: true, employeeId: true } },
    },
    orderBy: [{ class: { className: "asc" } }, { section: { sectionName: "asc" } }],
  });
}

export async function getClassTeacherById(id: string) {
  return prisma.classTeacher.findUnique({
    where: { id },
    include: { class: true, section: true, teacher: true },
  });
}

export async function getClassTeacherByClassAndSection(classId: string, sectionId: string) {
  return prisma.classTeacher.findUnique({
    where: { classId_sectionId: { classId, sectionId } },
    include: { teacher: { select: { id: true, teacherName: true, employeeId: true } } },
  });
}

export async function upsertClassTeacher(data: {
  classId: string;
  sectionId: string;
  teacherId: string;
}) {
  return prisma.classTeacher.upsert({
    where: { classId_sectionId: { classId: data.classId, sectionId: data.sectionId } },
    update: { teacherId: data.teacherId },
    create: data,
  });
}

export async function deleteClassTeacher(id: string) {
  await prisma.classTeacher.delete({ where: { id } });
}
