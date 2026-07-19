import { NextResponse } from "next/server";
import { getResults, upsertResult } from "@/lib/results";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);
  if (!admin && !teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const examId = searchParams.get("examId") || undefined;
    const studentId = searchParams.get("studentId") || undefined;

    let results;
    if (teacher) {
      const assignedClasses = teacher.assignedClasses
        ? teacher.assignedClasses.split(",").map((c) => c.trim())
        : [];
      results = await getResults({ examId, studentId });
      results = results.filter((r: { student: { className: string } }) =>
        assignedClasses.includes(r.student.className)
      );
    } else {
      results = await getResults({ examId, studentId });
    }

    return NextResponse.json({ results, count: results.length });
  } catch (error) {
    console.error("GET /api/results error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);
  if (!admin && !teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { studentId, examId, subjectId, marksObtained, maximumMarks, grade, remarks } = body;

    if (!studentId || !examId || !subjectId || marksObtained == null || maximumMarks == null) {
      return NextResponse.json(
        { error: "studentId, examId, subjectId, marksObtained, and maximumMarks are required" },
        { status: 400 }
      );
    }

    if (typeof marksObtained !== "number" || typeof maximumMarks !== "number" || maximumMarks <= 0) {
      return NextResponse.json(
        { error: "marksObtained must be a number and maximumMarks must be a positive number" },
        { status: 400 }
      );
    }

    if (teacher) {
      const assignedClasses = teacher.assignedClasses
        ? teacher.assignedClasses.split(",").map((c) => c.trim())
        : [];
      const { getStudentById } = await import("@/lib/students");
      const student = await getStudentById(studentId);
      if (!student || !assignedClasses.includes(student.className)) {
        return NextResponse.json(
          { error: "Not authorized to create results for this student" },
          { status: 403 }
        );
      }
    }

    const result = await upsertResult({ studentId, examId, subjectId, marksObtained, maximumMarks, grade, remarks });

    const actingAdmin = admin || (teacher ? { id: teacher.id, name: teacher.teacherName } : null);
    if (actingAdmin) {
      await createAuditLog({
        action: "UPDATE",
        entity: "Result",
        entityId: result.id,
        adminId: actingAdmin.id,
        adminName: actingAdmin.name,
        details: JSON.stringify({ studentId, examId, subjectId }),
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error("POST /api/results error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
