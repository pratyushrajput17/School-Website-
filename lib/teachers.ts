import { prisma } from "./prisma";

export interface TeacherData {
  employeeId: string;
  teacherName: string;
  email: string;
  phone: string;
  subject: string;
  assignedClasses?: string;
  joiningDate: string;
  qualification: string;
  address: string;
  photoUrl?: string;
  status?: string;
}

export interface UpdateTeacherData {
  employeeId?: string;
  teacherName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  assignedClasses?: string;
  joiningDate?: string;
  qualification?: string;
  address?: string;
  photoUrl?: string;
  status?: string;
}

export async function getTeachers(options?: {
  search?: string;
  subject?: string;
  assignedClass?: string;
  status?: string;
  limit?: number;
}) {
  const where: Record<string, unknown> = {};

  if (options?.search) {
    where.OR = [
      { teacherName: { contains: options.search, mode: "insensitive" } },
      { employeeId: { contains: options.search, mode: "insensitive" } },
      { email: { contains: options.search, mode: "insensitive" } },
      { phone: { contains: options.search, mode: "insensitive" } },
      { subject: { contains: options.search, mode: "insensitive" } },
    ];
  }

  if (options?.subject) {
    where.subject = options.subject;
  }

  if (options?.assignedClass) {
    where.assignedClasses = { contains: options.assignedClass };
  }

  if (options?.status) {
    where.status = options.status;
  }

  const teachers = await prisma.teacher.findMany({
    where,
    orderBy: [{ teacherName: "asc" }],
    take: options?.limit,
  });

  return teachers.map((t) => ({
    ...t,
    joiningDate: t.joiningDate.toISOString(),
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));
}

export async function getTeacherById(id: string) {
  const teacher = await prisma.teacher.findUnique({ where: { id } });
  if (!teacher) return null;
  return {
    ...teacher,
    joiningDate: teacher.joiningDate.toISOString(),
    createdAt: teacher.createdAt.toISOString(),
    updatedAt: teacher.updatedAt.toISOString(),
  };
}

export async function createTeacher(data: TeacherData) {
  const teacher = await prisma.teacher.create({
    data: {
      employeeId: data.employeeId,
      teacherName: data.teacherName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      assignedClasses: data.assignedClasses ?? "",
      joiningDate: new Date(data.joiningDate),
      qualification: data.qualification,
      address: data.address,
      photoUrl: data.photoUrl ?? null,
      status: data.status ?? "Active",
    },
  });
  return {
    ...teacher,
    joiningDate: teacher.joiningDate.toISOString(),
    createdAt: teacher.createdAt.toISOString(),
    updatedAt: teacher.updatedAt.toISOString(),
  };
}

export async function updateTeacher(id: string, data: UpdateTeacherData) {
  const updateData: Record<string, unknown> = {};
  if (data.employeeId !== undefined) updateData.employeeId = data.employeeId;
  if (data.teacherName !== undefined) updateData.teacherName = data.teacherName;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.subject !== undefined) updateData.subject = data.subject;
  if (data.assignedClasses !== undefined) updateData.assignedClasses = data.assignedClasses;
  if (data.joiningDate !== undefined) updateData.joiningDate = new Date(data.joiningDate);
  if (data.qualification !== undefined) updateData.qualification = data.qualification;
  if (data.address !== undefined) updateData.address = data.address;
  if (data.photoUrl !== undefined) updateData.photoUrl = data.photoUrl ?? null;
  if (data.status !== undefined) updateData.status = data.status;

  const teacher = await prisma.teacher.update({
    where: { id },
    data: updateData,
  });
  return {
    ...teacher,
    joiningDate: teacher.joiningDate.toISOString(),
    createdAt: teacher.createdAt.toISOString(),
    updatedAt: teacher.updatedAt.toISOString(),
  };
}

export async function deleteTeacher(id: string) {
  await prisma.teacher.delete({ where: { id } });
}

export async function getTeacherCount(options?: { status?: string }) {
  if (options?.status) {
    return prisma.teacher.count({ where: { status: options.status } });
  }
  return prisma.teacher.count();
}

export async function getTeacherSubjects() {
  const result = await prisma.teacher.findMany({
    select: { subject: true },
    distinct: ["subject"],
    orderBy: { subject: "asc" },
  });
  return result.map((r) => r.subject);
}

export async function getTeachersPerSubject() {
  const teachers = await prisma.teacher.groupBy({
    by: ["subject"],
    _count: { subject: true },
    orderBy: { subject: "asc" },
  });
  return teachers.map((t) => ({
    subject: t.subject,
    count: t._count.subject,
  }));
}
