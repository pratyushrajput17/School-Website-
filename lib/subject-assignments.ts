import { prisma } from "./prisma";

export async function getSubjectAssignments(options?: {
  classId?: string;
  sectionId?: string;
  teacherId?: string;
}) {
  const where: Record<string, unknown> = {};
  if (options?.classId) where.classId = options.classId;
  if (options?.sectionId) where.sectionId = options.sectionId;
  if (options?.teacherId) where.teacherId = options.teacherId;

  return prisma.subjectAssignment.findMany({
    where,
    include: {
      class: true,
      section: true,
      subject: true,
      teacher: { select: { id: true, teacherName: true, employeeId: true } },
    },
    orderBy: [{ class: { className: "asc" } }, { subject: { subjectName: "asc" } }],
  });
}

export async function getSubjectAssignmentById(id: string) {
  return prisma.subjectAssignment.findUnique({
    where: { id },
    include: { class: true, section: true, subject: true, teacher: true },
  });
}

export async function upsertSubjectAssignment(data: {
  classId: string;
  sectionId: string;
  subjectId: string;
  teacherId: string;
}) {
  return prisma.subjectAssignment.upsert({
    where: {
      classId_sectionId_subjectId: {
        classId: data.classId,
        sectionId: data.sectionId,
        subjectId: data.subjectId,
      },
    },
    update: { teacherId: data.teacherId },
    create: data,
  });
}

export async function deleteSubjectAssignment(id: string) {
  await prisma.subjectAssignment.delete({ where: { id } });
}

export async function getSubjectsByClassAndSection(classId: string, sectionId: string) {
  return prisma.subjectAssignment.findMany({
    where: { classId, sectionId },
    include: {
      subject: true,
      teacher: { select: { id: true, teacherName: true } },
    },
    orderBy: { subject: { subjectName: "asc" } },
  });
}
