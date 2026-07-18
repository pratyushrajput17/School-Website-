import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { getStudentCount, getStudentsPerClass } from "@/lib/students";
import {
  getTeacherCount,
  getTeachersPerSubject,
} from "@/lib/teachers";
import { getTodaysAttendanceSummary } from "@/lib/attendance";
import { getHomeworkCount } from "@/lib/homework";
import { getClasses } from "@/lib/classes";
import { getSections } from "@/lib/sections";
import { getSubjects } from "@/lib/subjects";
import { getClassTeachers } from "@/lib/class-teachers";
import { getSubjectAssignments } from "@/lib/subject-assignments";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const [
      notices,
      events,
      gallery,
      achievers,
      students,
      activeStudents,
      studentsPerClass,
      teachers,
      activeTeachers,
      teachersPerSubject,
      attendanceSummary,
      homework,
      classes,
      sections,
      subjects,
      classTeachers,
      subjectAssignments,
    ] = await Promise.all([
      prisma.notice.count(),
      prisma.event.count(),
      prisma.gallery.count(),
      prisma.achiever.count(),
      prisma.student.count(),
      getStudentCount({ status: "Active" }),
      getStudentsPerClass(),
      getTeacherCount(),
      getTeacherCount({ status: "Active" }),
      getTeachersPerSubject(),
      getTodaysAttendanceSummary(),
      getHomeworkCount(),
      (await getClasses()).length,
      (await getSections()).length,
      (await getSubjects()).length,
      (await getClassTeachers()).length,
      (await getSubjectAssignments()).length,
    ]);

    return NextResponse.json({
      stats: {
        notices,
        events,
        gallery,
        achievers,
        students,
        activeStudents,
        studentsPerClass,
        teachers,
        activeTeachers,
        teachersPerSubject,
        attendance: attendanceSummary,
        homework,
        classes,
        sections,
        subjects,
        classTeachers,
        subjectAssignments,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
