import { prisma } from "./prisma";
import { calculateGrade } from "./results";

interface SubjectResult {
  subjectName: string;
  subjectCode: string;
  marksObtained: number;
  maximumMarks: number;
  percentage: number;
  grade: string;
}

interface ExamReport {
  examId: string;
  examName: string;
  examType: string;
  academicSession: number;
  subjects: SubjectResult[];
  totalObtained: number;
  totalMax: number;
  overallPercentage: number;
  overallGrade: string;
}

interface StudentInfo {
  id: string;
  studentName: string;
  admissionNumber: string;
  className: string;
  section: string;
}

export interface ReportCardData {
  student: StudentInfo;
  exams: ExamReport[];
  overallAttendance?: {
    total: number;
    present: number;
    percentage: number;
  };
}

export async function getStudentReportCard(studentId: string): Promise<ReportCardData | null> {
  const student = await prisma.student.findUnique({
    where: { id: studentId },
    select: { id: true, studentName: true, admissionNumber: true, className: true, section: true },
  });
  if (!student) return null;

  const results = await prisma.result.findMany({
    where: { studentId },
    include: {
      exam: { select: { id: true, examName: true, academicSession: true, examType: true, isPublished: true } },
      subject: { select: { id: true, subjectName: true, subjectCode: true } },
    },
    orderBy: [{ exam: { academicSession: "desc" } }, { exam: { startDate: "desc" } }, { subject: { subjectName: "asc" } }],
  });

  const examMap: Record<string, ExamReport> = {};
  for (const r of results) {
    if (!r.exam.isPublished) continue;
    if (!examMap[r.exam.id]) {
      examMap[r.exam.id] = {
        examId: r.exam.id,
        examName: r.exam.examName,
        examType: r.exam.examType,
        academicSession: r.exam.academicSession,
        subjects: [],
        totalObtained: 0,
        totalMax: 0,
        overallPercentage: 0,
        overallGrade: "",
      };
    }
    const pct = r.maximumMarks > 0 ? Math.round((r.marksObtained / r.maximumMarks) * 100) : 0;
    examMap[r.exam.id].subjects.push({
      subjectName: r.subject.subjectName,
      subjectCode: r.subject.subjectCode,
      marksObtained: r.marksObtained,
      maximumMarks: r.maximumMarks,
      percentage: pct,
      grade: r.grade || calculateGrade(pct),
    });
    examMap[r.exam.id].totalObtained += r.marksObtained;
    examMap[r.exam.id].totalMax += r.maximumMarks;
  }

  for (const key of Object.keys(examMap)) {
    const e = examMap[key];
    e.overallPercentage = e.totalMax > 0 ? Math.round((e.totalObtained / e.totalMax) * 100) : 0;
    e.overallGrade = calculateGrade(e.overallPercentage);
  }

  const attendance = await prisma.attendance.findMany({ where: { studentId } });
  const present = attendance.filter((a) => a.status === "Present").length;
  const overallAttendance = attendance.length > 0 ? {
    total: attendance.length,
    present,
    percentage: Math.round((present / attendance.length) * 100),
  } : undefined;

  return {
    student,
    exams: Object.values(examMap).sort((a, b) => b.academicSession - a.academicSession || b.examType.localeCompare(a.examType)),
    overallAttendance,
  };
}

export interface RankingEntry {
  studentId: string;
  studentName: string;
  admissionNumber: string;
  className: string;
  section: string;
  totalObtained: number;
  totalMax: number;
  percentage: number;
  grade: string;
  rank?: number;
}

export async function getExamRankings(examId: string): Promise<{
  school: RankingEntry[];
  classWise: Record<string, RankingEntry[]>;
  toppers: RankingEntry[];
}> {
  const results = await prisma.result.findMany({
    where: { examId },
    include: {
      student: { select: { id: true, studentName: true, admissionNumber: true, className: true, section: true } },
      subject: { select: { id: true, subjectName: true } },
    },
  });

  const studentMap: Record<string, RankingEntry> = {};
  for (const r of results) {
    if (!studentMap[r.student.id]) {
      studentMap[r.student.id] = {
        studentId: r.student.id,
        studentName: r.student.studentName,
        admissionNumber: r.student.admissionNumber,
        className: r.student.className,
        section: r.student.section,
        totalObtained: 0,
        totalMax: 0,
        percentage: 0,
        grade: "",
      };
    }
    studentMap[r.student.id].totalObtained += r.marksObtained;
    studentMap[r.student.id].totalMax += r.maximumMarks;
  }

  const allEntries = Object.values(studentMap).map((e) => {
    const pct = e.totalMax > 0 ? Math.round((e.totalObtained / e.totalMax) * 100) : 0;
    return { ...e, percentage: pct, grade: calculateGrade(pct) };
  });

  allEntries.sort((a, b) => b.percentage - a.percentage || a.studentName.localeCompare(b.studentName));

  const school = allEntries.map((e, i) => ({ ...e, rank: i + 1 }));

  const classWise: Record<string, RankingEntry[]> = {};
  for (const e of school) {
    if (!classWise[e.className]) classWise[e.className] = [];
    classWise[e.className].push({ ...e, rank: classWise[e.className].length + 1 });
  }

  const toppers = school.slice(0, 3);

  return { school, classWise, toppers };
}
