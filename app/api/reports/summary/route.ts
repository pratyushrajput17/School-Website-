import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";
import { getActiveSession } from "@/lib/academic-sessions";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalStudents,
      totalTeachers,
      totalClasses,
      totalParents,
      totalExams,
      totalResults,
      totalAttendance,
      presentAttendance,
      activeSession,
    ] = await Promise.all([
      prisma.student.count({ where: { status: "Active" } }),
      prisma.teacher.count({ where: { status: "Active" } }),
      prisma.schoolClass.count({ where: { status: "Active" } }),
      prisma.parent.count({ where: { status: "Active" } }),
      prisma.exam.count(),
      prisma.result.count(),
      prisma.attendance.count({
        where: { attendanceDate: { gte: thirtyDaysAgo } },
      }),
      prisma.attendance.count({
        where: { attendanceDate: { gte: thirtyDaysAgo }, status: "Present" },
      }),
      getActiveSession(),
    ]);

    const attendanceRate =
      totalAttendance > 0
        ? Math.round((presentAttendance / totalAttendance) * 100)
        : 0;

    return NextResponse.json({
      totalStudents,
      totalTeachers,
      totalClasses,
      totalParents,
      totalExams,
      totalResults,
      attendanceRate,
      activeSession,
    });
  } catch (error) {
    console.error("GET /api/reports/summary error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
