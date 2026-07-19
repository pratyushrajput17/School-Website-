import { NextResponse } from "next/server";
import { bulkUpsertResults } from "@/lib/results";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);
  if (!admin && !teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { records } = body;

    if (!Array.isArray(records) || records.length === 0) {
      return NextResponse.json(
        { error: "records must be a non-empty array" },
        { status: 400 }
      );
    }

    for (let i = 0; i < records.length; i++) {
      const r = records[i];
      if (!r.studentId || !r.examId || !r.subjectId || r.marksObtained == null || r.maximumMarks == null) {
        return NextResponse.json(
          { error: `Record at index ${i} is missing required fields (studentId, examId, subjectId, marksObtained, maximumMarks)` },
          { status: 400 }
        );
      }
    }

    if (teacher) {
      const assignedClasses = teacher.assignedClasses
        ? teacher.assignedClasses.split(",").map((c: string) => c.trim())
        : [];
      const { getStudentById } = await import("@/lib/students");
      for (let i = 0; i < records.length; i++) {
        const student = await getStudentById(records[i].studentId);
        if (!student || !assignedClasses.includes(student.className)) {
          return NextResponse.json(
            { error: `Not authorized to create results for student at index ${i}` },
            { status: 403 }
          );
        }
      }
    }

    const results = await bulkUpsertResults(records);

    const actingAdmin = admin || (teacher ? { id: teacher.id, name: teacher.teacherName } : null);
    if (actingAdmin) {
      await createAuditLog({
        action: "UPDATE",
        entity: "Result",
        adminId: actingAdmin.id,
        adminName: actingAdmin.name,
        details: JSON.stringify({ count: results.length }),
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ results, count: results.length }, { status: 201 });
  } catch (error) {
    console.error("POST /api/results/bulk error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
