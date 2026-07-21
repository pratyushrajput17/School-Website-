import { prisma } from "./prisma";

export interface StudentData {
  admissionNumber?: string;
  scholarNumber?: string;
  category?: string;
  caste?: string;
  penNumber?: string;
  aadhaarNumber?: string;
  whatsappNumber?: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  mobileNumber: string;
  alternateMobile?: string;
  dateOfBirth: string;
  gender?: string;
  className: string;
  section: string;
  address: string;
  admissionDate: string;
  status?: string;
  photoUrl?: string;
}

export interface UpdateStudentData {
  admissionNumber?: string;
  scholarNumber?: string;
  category?: string;
  caste?: string;
  penNumber?: string;
  aadhaarNumber?: string;
  whatsappNumber?: string;
  studentName?: string;
  fatherName?: string;
  motherName?: string;
  mobileNumber?: string;
  alternateMobile?: string;
  dateOfBirth?: string;
  gender?: string;
  className?: string;
  section?: string;
  address?: string;
  admissionDate?: string;
  status?: string;
  photoUrl?: string;
}

export async function getStudents(options?: {
  search?: string;
  className?: string;
  section?: string;
  status?: string;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.search) {
    where.OR = [
      { studentName: { contains: options.search, mode: "insensitive" } },
      { admissionNumber: { contains: options.search, mode: "insensitive" } },
      { scholarNumber: { contains: options.search, mode: "insensitive" } },
      { penNumber: { contains: options.search, mode: "insensitive" } },
      { aadhaarNumber: { contains: options.search, mode: "insensitive" } },
      { fatherName: { contains: options.search, mode: "insensitive" } },
      { motherName: { contains: options.search, mode: "insensitive" } },
      { mobileNumber: { contains: options.search, mode: "insensitive" } },
    ];
  }

  if (options?.className) {
    where.className = options.className;
  }

  if (options?.section) {
    where.section = options.section;
  }

  if (options?.status) {
    where.status = options.status;
  }

  const students = await prisma.student.findMany({
    where,
    orderBy: [
      { className: "asc" },
      { section: "asc" },
      { studentName: "asc" },
    ],
    take: options?.limit,
  });

  return students.map((s) => ({
    ...s,
    dateOfBirth: s.dateOfBirth.toISOString(),
    admissionDate: s.admissionDate.toISOString(),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
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
    updatedAt: student.updatedAt.toISOString(),
  };
}

export async function getStudentByAdmissionNumber(admissionNumber: string) {
  const student = await prisma.student.findUnique({
    where: { admissionNumber },
  });
  if (!student) return null;
  return {
    ...student,
    dateOfBirth: student.dateOfBirth.toISOString(),
    admissionDate: student.admissionDate.toISOString(),
    createdAt: student.createdAt.toISOString(),
    updatedAt: student.updatedAt.toISOString(),
  };
}

export async function createStudent(data: StudentData) {
  const student = await prisma.student.create({
    data: {
      admissionNumber: data.admissionNumber || `SR-${Date.now()}`,
      scholarNumber: data.scholarNumber ?? "",
      category: data.category ?? "General",
      caste: data.caste ?? "",
      penNumber: data.penNumber ?? "",
      aadhaarNumber: data.aadhaarNumber ?? "",
      whatsappNumber: data.whatsappNumber ?? "",
      studentName: data.studentName,
      fatherName: data.fatherName,
      motherName: data.motherName,
      mobileNumber: data.mobileNumber,
      alternateMobile: data.alternateMobile ?? "",
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender ?? "",
      className: data.className,
      section: data.section,
      address: data.address,
      admissionDate: new Date(data.admissionDate),
      status: data.status ?? "Active",
      photoUrl: data.photoUrl ?? null,
    },
  });
  return {
    ...student,
    dateOfBirth: student.dateOfBirth.toISOString(),
    admissionDate: student.admissionDate.toISOString(),
    createdAt: student.createdAt.toISOString(),
    updatedAt: student.updatedAt.toISOString(),
  };
}

export async function updateStudent(id: string, data: UpdateStudentData) {
  const updateData: Record<string, unknown> = {};
  if (data.admissionNumber !== undefined) updateData.admissionNumber = data.admissionNumber;
  if (data.scholarNumber !== undefined) updateData.scholarNumber = data.scholarNumber;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.caste !== undefined) updateData.caste = data.caste;
  if (data.penNumber !== undefined) updateData.penNumber = data.penNumber;
  if (data.aadhaarNumber !== undefined) updateData.aadhaarNumber = data.aadhaarNumber;
  if (data.whatsappNumber !== undefined) updateData.whatsappNumber = data.whatsappNumber;
  if (data.studentName !== undefined) updateData.studentName = data.studentName;
  if (data.fatherName !== undefined) updateData.fatherName = data.fatherName;
  if (data.motherName !== undefined) updateData.motherName = data.motherName;
  if (data.mobileNumber !== undefined) updateData.mobileNumber = data.mobileNumber;
  if (data.alternateMobile !== undefined) updateData.alternateMobile = data.alternateMobile;
  if (data.dateOfBirth !== undefined) updateData.dateOfBirth = new Date(data.dateOfBirth);
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.className !== undefined) updateData.className = data.className;
  if (data.section !== undefined) updateData.section = data.section;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.admissionDate !== undefined) updateData.admissionDate = new Date(data.admissionDate);
  if (data.status !== undefined) updateData.status = data.status;
  if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl ?? null;

  const student = await prisma.student.update({
    where: { id },
    data: updateData,
  });
  return {
    ...student,
    dateOfBirth: student.dateOfBirth.toISOString(),
    admissionDate: student.admissionDate.toISOString(),
    createdAt: student.createdAt.toISOString(),
    updatedAt: student.updatedAt.toISOString(),
  };
}

export async function deleteStudent(id: string) {
  await prisma.student.delete({ where: { id } });
}

export async function getStudentCount(options?: { status?: string }) {
  if (options?.status) {
    return prisma.student.count({ where: { status: options.status } });
  }
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

export async function getStudentsPerClass() {
  const students = await prisma.student.groupBy({
    by: ["className"],
    _count: { className: true },
    orderBy: { className: "asc" },
  });
  return students.map((s) => ({
    className: s.className,
    count: s._count.className,
  }));
}
