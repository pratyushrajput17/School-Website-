import { prisma } from "./prisma";

export interface ResultData {
  studentId: string;
  examId: string;
  subjectId: string;
  marksObtained: number;
  maximumMarks: number;
  grade?: string;
  remarks?: string;
}

export function calculateGrade(percentage: number): string {
  if (percentage >= 90) return "A+";
  if (percentage >= 75) return "A";
  if (percentage >= 60) return "B";
  if (percentage >= 45) return "C";
  if (percentage >= 33) return "D";
  return "F";
}

export async function getResults(options?: {
  examId?: string;
  studentId?: string;
  classId?: string;
  sectionId?: string;
}) {
  const where: Record<string, unknown> = {};
  if (options?.examId) where.examId = options.examId;
  if (options?.studentId) where.studentId = options.studentId;

  const results = await prisma.result.findMany({
    where,
    include: {
      student: { select: { id: true, studentName: true, admissionNumber: true, className: true, section: true } },
      subject: { select: { id: true, subjectName: true, subjectCode: true } },
      exam: { select: { id: true, examName: true, academicSession: true, examType: true } },
    },
    orderBy: [{ student: { className: "asc" } }, { student: { section: "asc" } }, { student: { studentName: "asc" } }, { subject: { subjectName: "asc" } }],
  });

  let filtered = results;
  if (options?.classId || options?.sectionId) {
    filtered = results.filter((r) => {
      if (options?.classId && r.student.className !== options.classId) return false;
      if (options?.sectionId && r.student.section !== options.sectionId) return false;
      return true;
    });
  }

  return filtered.map((r) => ({
    ...r,
    percentage: r.maximumMarks > 0 ? Math.round((r.marksObtained / r.maximumMarks) * 100) : 0,
  }));
}

export async function getResultById(id: string) {
  const result = await prisma.result.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, studentName: true, admissionNumber: true, className: true, section: true } },
      subject: { select: { id: true, subjectName: true, subjectCode: true } },
      exam: { select: { id: true, examName: true, academicSession: true, examType: true } },
    },
  });
  if (!result) return null;
  return { ...result, percentage: result.maximumMarks > 0 ? Math.round((result.marksObtained / result.maximumMarks) * 100) : 0 };
}

export async function upsertResult(data: ResultData) {
  const percentage = data.maximumMarks > 0 ? (data.marksObtained / data.maximumMarks) * 100 : 0;
  const grade = data.grade || calculateGrade(percentage);

  const result = await prisma.result.upsert({
    where: {
      studentId_examId_subjectId: {
        studentId: data.studentId,
        examId: data.examId,
        subjectId: data.subjectId,
      },
    },
    update: {
      marksObtained: data.marksObtained,
      maximumMarks: data.maximumMarks,
      grade,
      remarks: data.remarks ?? "",
    },
    create: {
      studentId: data.studentId,
      examId: data.examId,
      subjectId: data.subjectId,
      marksObtained: data.marksObtained,
      maximumMarks: data.maximumMarks,
      grade,
      remarks: data.remarks ?? "",
    },
    include: {
      student: { select: { id: true, studentName: true, className: true, section: true } },
      subject: { select: { id: true, subjectName: true } },
    },
  });
  return { ...result, percentage: result.maximumMarks > 0 ? Math.round((result.marksObtained / result.maximumMarks) * 100) : 0 };
}

export async function bulkUpsertResults(records: ResultData[]) {
  const results = [];
  for (const r of records) {
    results.push(await upsertResult(r));
  }
  return results;
}

export async function deleteResult(id: string) {
  await prisma.result.delete({ where: { id } });
}

export async function getResultsForStudent(studentId: string) {
  const results = await prisma.result.findMany({
    where: { studentId },
    include: {
      exam: { select: { id: true, examName: true, academicSession: true, examType: true, isPublished: true } },
      subject: { select: { id: true, subjectName: true, subjectCode: true } },
    },
    orderBy: [{ exam: { academicSession: "desc" } }, { exam: { startDate: "desc" } }, { subject: { subjectName: "asc" } }],
  });

  const grouped: Record<string, { exam: typeof results[0]["exam"]; subjects: typeof results }> = {};
  for (const r of results) {
    if (!r.exam.isPublished) continue;
    const key = r.exam.id;
    if (!grouped[key]) grouped[key] = { exam: r.exam, subjects: [] };
    grouped[key].subjects.push(r);
  }

  return Object.values(grouped).map((g) => {
    const totalObtained = g.subjects.reduce((s, r) => s + r.marksObtained, 0);
    const totalMax = g.subjects.reduce((s, r) => s + r.maximumMarks, 0);
    return {
      exam: g.exam,
      subjects: g.subjects.map((r) => ({
        ...r,
        percentage: r.maximumMarks > 0 ? Math.round((r.marksObtained / r.maximumMarks) * 100) : 0,
      })),
      totalObtained,
      totalMax,
      overallPercentage: totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0,
      overallGrade: calculateGrade(totalMax > 0 ? (totalObtained / totalMax) * 100 : 0),
    };
  });
}

export async function getResultCount(options?: { examId?: string }) {
  const where: Record<string, unknown> = {};
  if (options?.examId) where.examId = options.examId;
  return prisma.result.count({ where });
}
