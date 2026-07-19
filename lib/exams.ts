import { prisma } from "./prisma";

export interface ExamData {
  examName: string;
  academicSession: number;
  examType: string;
  startDate: string;
  endDate: string;
  isPublished?: boolean;
  createdBy: string;
}

export interface UpdateExamData {
  examName?: string;
  academicSession?: number;
  examType?: string;
  startDate?: string;
  endDate?: string;
  isPublished?: boolean;
}

export async function getExams(options?: {
  academicSession?: number;
  examType?: string;
  publishedOnly?: boolean;
}) {
  const where: Record<string, unknown> = {};
  if (options?.academicSession) where.academicSession = options.academicSession;
  if (options?.examType) where.examType = options.examType;
  if (options?.publishedOnly) where.isPublished = true;

  const exams = await prisma.exam.findMany({
    where,
    orderBy: [{ academicSession: "desc" }, { startDate: "desc" }],
    include: { _count: { select: { results: true } } },
  });

  return exams.map((e) => ({
    ...e,
    startDate: e.startDate.toISOString(),
    endDate: e.endDate.toISOString(),
    createdAt: e.createdAt.toISOString(),
    updatedAt: e.updatedAt.toISOString(),
    resultCount: e._count.results,
  }));
}

export async function getExamById(id: string) {
  const exam = await prisma.exam.findUnique({
    where: { id },
    include: { _count: { select: { results: true } } },
  });
  if (!exam) return null;
  return {
    ...exam,
    startDate: exam.startDate.toISOString(),
    endDate: exam.endDate.toISOString(),
    createdAt: exam.createdAt.toISOString(),
    updatedAt: exam.updatedAt.toISOString(),
    resultCount: exam._count.results,
  };
}

export async function createExam(data: ExamData) {
  const exam = await prisma.exam.create({
    data: {
      examName: data.examName,
      academicSession: data.academicSession,
      examType: data.examType,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      isPublished: data.isPublished ?? false,
      createdBy: data.createdBy,
    },
  });
  return { ...exam, startDate: exam.startDate.toISOString(), endDate: exam.endDate.toISOString(), createdAt: exam.createdAt.toISOString(), updatedAt: exam.updatedAt.toISOString() };
}

export async function updateExam(id: string, data: UpdateExamData) {
  const updateData: Record<string, unknown> = {};
  if (data.examName !== undefined) updateData.examName = data.examName;
  if (data.academicSession !== undefined) updateData.academicSession = data.academicSession;
  if (data.examType !== undefined) updateData.examType = data.examType;
  if (data.startDate !== undefined) updateData.startDate = new Date(data.startDate);
  if (data.endDate !== undefined) updateData.endDate = new Date(data.endDate);
  if (data.isPublished !== undefined) updateData.isPublished = data.isPublished;

  const exam = await prisma.exam.update({ where: { id }, data: updateData });
  return { ...exam, startDate: exam.startDate.toISOString(), endDate: exam.endDate.toISOString(), createdAt: exam.createdAt.toISOString(), updatedAt: exam.updatedAt.toISOString() };
}

export async function deleteExam(id: string) {
  await prisma.exam.delete({ where: { id } });
}

export async function getExamSessions() {
  const result = await prisma.exam.findMany({
    select: { academicSession: true },
    distinct: ["academicSession"],
    orderBy: { academicSession: "desc" },
  });
  return result.map((r) => r.academicSession);
}

export async function getExamCount() {
  return prisma.exam.count();
}
