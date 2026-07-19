import { NextResponse } from "next/server";
import { getStudentById, updateStudent, deleteStudent } from "@/lib/students";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const student = await getStudentById(id);

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error("GET /api/students/[id] error:", error);
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

  try {
    const { id } = await params;

    const existing = await getStudentById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    const student = await updateStudent(id, {
      admissionNumber: body.admissionNumber,
      studentName: body.studentName,
      fatherName: body.fatherName,
      motherName: body.motherName,
      mobileNumber: body.mobileNumber,
      alternateMobile: body.alternateMobile,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      className: body.className,
      section: body.section,
      address: body.address,
      status: body.status,
      admissionDate: body.admissionDate,
      photoUrl: body.photoUrl,
    });

    return NextResponse.json({ student });
  } catch (error: unknown) {
    console.error("PUT /api/students/[id] error:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A student with this admission number already exists" },
        { status: 409 }
      );
    }
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

    const existing = await getStudentById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    await deleteStudent(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/students/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
