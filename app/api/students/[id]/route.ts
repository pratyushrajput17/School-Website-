import { NextResponse } from "next/server";
import { getStudentById, updateStudent, deleteStudent } from "@/lib/students";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { admissionNumber, studentName, fatherName, motherName, mobileNumber, className, section, dateOfBirth, address, status, admissionDate } = body;

    if (!admissionNumber || !studentName || !fatherName || !motherName || !mobileNumber || !className || !section || !dateOfBirth || !address || !admissionDate) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    const student = await updateStudent(id, {
      admissionNumber,
      studentName,
      fatherName,
      motherName,
      mobileNumber,
      className,
      section,
      dateOfBirth,
      address,
      status: status || "Active",
      admissionDate,
    });

    return NextResponse.json({ student });
  } catch (error: unknown) {
    console.error("PUT /api/students/[id] error:", error);
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
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
