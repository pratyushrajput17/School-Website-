import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const teacher = getTeacherFromRequest(request);
  if (!teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const className = searchParams.get("className");
  const section = searchParams.get("section");

  if (!date || !className || !section) {
    return NextResponse.json({ error: "date, className, section required" }, { status: 400 });
  }

  try {
    const assignment = await prisma.subjectAssignment.findFirst({
      where: { teacherId: teacher.id, class: { className }, section: { sectionName: section } },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Not authorized for this class/section" }, { status: 403 });
    }

    const d = new Date(date);
    const start = new Date(d.setHours(0, 0, 0, 0));
    const end = new Date(d.setHours(23, 59, 59, 999));

    const records = await prisma.attendance.findMany({
      where: {
        teacherId: teacher.id,
        className,
        section,
        attendanceDate: { gte: start, lte: end },
      },
      select: {
        id: true,
        studentId: true,
        status: true,
        remarks: true,
      },
    });

    return NextResponse.json({ records });
  } catch (error) {
    console.error("GET /api/teacher/attendance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const teacher = getTeacherFromRequest(request);
  if (!teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { className, section, attendanceDate, records } = await request.json();

    if (!className || !section || !attendanceDate || !records || !Array.isArray(records)) {
      return NextResponse.json(
        { error: "className, section, attendanceDate, and records are required" },
        { status: 400 }
      );
    }

    const assignment = await prisma.subjectAssignment.findFirst({
      where: { teacherId: teacher.id, class: { className }, section: { sectionName: section } },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Not authorized for this class/section" }, { status: 403 });
    }

    const results = [];
    const d = new Date(attendanceDate);
    d.setHours(12, 0, 0, 0);

    for (const r of records) {
      const result = await prisma.attendance.upsert({
        where: {
          studentId_attendanceDate: { studentId: r.studentId, attendanceDate: d },
        },
        update: { status: r.status, remarks: r.remarks ?? "", teacherId: teacher.id, className, section },
        create: {
          studentId: r.studentId,
          teacherId: teacher.id,
          className,
          section,
          attendanceDate: d,
          status: r.status,
          remarks: r.remarks ?? "",
        },
      });
      results.push({
        id: result.id,
        studentId: result.studentId,
        status: result.status,
        remarks: result.remarks,
      });
    }

    return NextResponse.json({ records: results, count: results.length }, { status: 201 });
  } catch (error) {
    console.error("POST /api/teacher/attendance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}