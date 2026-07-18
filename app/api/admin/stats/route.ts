import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { getStudentCount, getStudentsPerClass } from "@/lib/students";
import {
  getTeacherCount,
  getTeachersPerSubject,
} from "@/lib/teachers";

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
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
