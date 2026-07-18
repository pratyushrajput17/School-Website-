import { prisma } from "./prisma";

export interface StudentData {
  admissionNumber: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  className: string;
  section: string;
  dateOfBirth: string;
  address: string;
  status: string;
  admissionDate: string;
}

export async function getStudents(options?: {
  search?: string;
  className?: string;
  section?: string;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.search) {
    where.OR = [
      { studentName: { contains: options.search, mode: "insensitive" } },
      { admissionNumber: { contains: options.search, mode: "insensitive" } },
      { fatherName: { contains: options.search, mode: "insensitive" } },
      { mobileNumber: { contains: options.search, mode: "insensitive" } },
    ];
  }

  if (options?.className) {
    where.className = options.className;
  }

  if (options?.section) {
    where.section = options.section;
  }

  const students = await prisma.student.findMany({
    where,
    orderBy: [{ className: "asc" }, { section: "asc" }, { studentName: "asc" }],
    take: options?.limit,
  });

  return students.map((s) => ({
    ...s,
    dateOfBirth: s.dateOfBirth.toISOString(),
    admissionDate: s.admissionDate.toISOString(),
    createdAt: s.createdAt.toISOString(),
  }));
}

export async function getStudentById(id: string) {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) return null;
  return {
    ...student,
    dateOfBirth: student.dateOfBirth.toISOString(),
    admissionDate: student.admissionDate.toISOString(),
    createdAt: student.createdAt.toISOString(),
  };
}

export async function createStudent(data: StudentData) {
  const student = await prisma.student.create({
    data: {
      admissionNumber: data.admissionNumber,
      studentName: data.studentName,
      fatherName: data.fatherName,
      motherName: data.motherName,
      mobileNumber: data.mobileNumber,
      className: data.className,
      section: data.section,
      dateOfBirth: new Date(data.dateOfBirth),
      address: data.address,
      status: data.status,
      admissionDate: new Date(data.admissionDate),
    },
  });
  return {
    ...student,
    dateOfBirth: student.dateOfBirth.toISOString(),
    admissionDate: student.admissionDate.toISOString(),
    createdAt: student.createdAt.toISOString(),
  };
}

export async function updateStudent(id: string, data: StudentData) {
  const student = await prisma.student.update({
    where: { id },
    data: {
      admissionNumber: data.admissionNumber,
      studentName: data.studentName,
      fatherName: data.fatherName,
      motherName: data.motherName,
      mobileNumber: data.mobileNumber,
      className: data.className,
      section: data.section,
      dateOfBirth: new Date(data.dateOfBirth),
      address: data.address,
      status: data.status,
      admissionDate: new Date(data.admissionDate),
    },
  });
  return {
    ...student,
    dateOfBirth: student.dateOfBirth.toISOString(),
    admissionDate: student.admissionDate.toISOString(),
    createdAt: student.createdAt.toISOString(),
  };
}

export async function deleteStudent(id: string) {
  await prisma.student.delete({ where: { id } });
}

export async function getStudentCount() {
  return prisma.student.count();
}

export async function getStudentClasses() {
  const result = await prisma.student.findMany({
    select: { className: true },
    distinct: ["className"],
    orderBy: { className: "asc" },
  });
  return result.map((r) => r.className);
}

export async function getStudentSections() {
  const result = await prisma.student.findMany({
    select: { section: true },
    distinct: ["section"],
    orderBy: { section: "asc" },
  });
  return result.map((r) => r.section);
}
