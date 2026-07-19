import { NextResponse } from "next/server";
import { getExamById, updateExam, deleteExam } from "@/lib/exams";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = getAdminFromRequest(_request);
    const teacher = getTeacherFromRequest(_request);
    if (!admin && !teacher) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const exam = await getExamById(id);

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json({ exam });
  } catch (error) {
    console.error("GET /api/exams/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await getExamById(id);
    if (!existing) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    const exam = await updateExam(id, {
      examName: body.examName,
      academicSession: body.academicSession,
      examType: body.examType,
      startDate: body.startDate,
      endDate: body.endDate,
      isPublished: body.isPublished,
    });

    return NextResponse.json({ exam });
  } catch (error) {
    console.error("PUT /api/exams/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const existing = await getExamById(id);
    if (!existing) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    await deleteExam(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/exams/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
