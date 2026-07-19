import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

function toCsv(headers: string[], rows: (string | number | null)[][]): string {
  const lines = [headers.join(",")];
  for (const row of rows) {
    lines.push(
      row
        .map((v) => {
          if (v === null || v === undefined) return "";
          const s = String(v);
          return s.includes(",") || s.includes('"') || s.includes("\n")
            ? `"${s.replace(/"/g, '""')}"`
            : s;
        })
        .join(",")
    );
  }
  return lines.join("\n");
}

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";

    if (type === "all") {
      const [students, teachers, attendance, results, exams, classes, sections, subjects, parents] =
        await Promise.all([
          prisma.student.findMany(),
          prisma.teacher.findMany(),
          prisma.attendance.findMany(),
          prisma.result.findMany(),
          prisma.exam.findMany(),
          prisma.schoolClass.findMany(),
          prisma.section.findMany(),
          prisma.subject.findMany(),
          prisma.parent.findMany(),
        ]);

      return NextResponse.json({
        students,
        teachers,
        attendance,
        results,
        exams,
        classes,
        sections,
        subjects,
        parents,
      });
    }

    if (type === "students") {
      const students = await prisma.student.findMany({ orderBy: { studentName: "asc" } });
      const csv = toCsv(
        ["ID", "Name", "Class", "Section", "Admission No", "Status", "Father Name", "Phone"],
        students.map((s) => [
          s.id,
          s.studentName,
          s.className,
          s.section,
          s.admissionNumber,
          s.status,
          s.fatherName,
          s.mobileNumber,
        ])
      );
      return new NextResponse(csv, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=students.csv" },
      });
    }

    if (type === "teachers") {
      const teachers = await prisma.teacher.findMany({ orderBy: { teacherName: "asc" } });
      const csv = toCsv(
        ["ID", "Name", "Phone", "Email", "Qualification", "Status"],
        teachers.map((t) => [
          t.id,
          t.teacherName,
          t.phone,
          t.email,
          t.qualification,
          t.status,
        ])
      );
      return new NextResponse(csv, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=teachers.csv" },
      });
    }

    if (type === "attendance") {
      const records = await prisma.attendance.findMany({ orderBy: { attendanceDate: "desc" } });
      const csv = toCsv(
        ["ID", "Student ID", "Class", "Section", "Date", "Status"],
        records.map((r) => [
          r.id,
          r.studentId,
          r.className,
          r.section,
          r.attendanceDate instanceof Date
            ? r.attendanceDate.toISOString().split("T")[0]
            : String(r.attendanceDate),
          r.status,
        ])
      );
      return new NextResponse(csv, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=attendance.csv" },
      });
    }

    if (type === "results") {
      const results = await prisma.result.findMany({
        include: {
          exam: { select: { examName: true } },
          student: { select: { studentName: true, className: true } },
          subject: { select: { subjectName: true } },
        },
      });
      const csv = toCsv(
        ["ID", "Student", "Class", "Exam", "Subject", "Marks Obtained", "Maximum Marks", "Grade"],
        results.map((r) => [
          r.id,
          r.student?.studentName || "",
          r.student?.className || "",
          r.exam?.examName || "",
          r.subject?.subjectName || "",
          r.marksObtained,
          r.maximumMarks,
          r.grade || "",
        ])
      );
      return new NextResponse(csv, {
        headers: { "Content-Type": "text/csv", "Content-Disposition": "attachment; filename=results.csv" },
      });
    }

    return NextResponse.json(
      { error: "Invalid type. Use: students, teachers, attendance, results, or all" },
      { status: 400 }
    );
  } catch (error) {
    console.error("GET /api/backups error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
