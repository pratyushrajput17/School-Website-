import { NextResponse } from "next/server";
import { getExams, createExam } from "@/lib/exams";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const admin = getAdminFromRequest(request);
    const teacher = getTeacherFromRequest(request);
    if (!admin && !teacher) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const academicSession = searchParams.get("academicSession")
      ? Number(searchParams.get("academicSession"))
      : undefined;
    const examType = searchParams.get("examType") || undefined;

    const exams = await getExams({ academicSession, examType });

    return NextResponse.json({ exams });
  } catch (error) {
    console.error("GET /api/exams error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.examName || !body.academicSession || !body.examType || !body.startDate || !body.endDate) {
      return NextResponse.json(
        { error: "Exam name, academic session, exam type, start date, and end date are required" },
        { status: 400 }
      );
    }

    const exam = await createExam({
      examName: body.examName,
      academicSession: body.academicSession,
      examType: body.examType,
      startDate: body.startDate,
      endDate: body.endDate,
      isPublished: body.isPublished ?? false,
      createdBy: admin.name,
    });

    return NextResponse.json({ exam }, { status: 201 });
  } catch (error) {
    console.error("POST /api/exams error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
