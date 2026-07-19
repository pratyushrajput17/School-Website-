import { NextResponse } from "next/server";
import { getTeacherById, updateTeacher, deleteTeacher } from "@/lib/teachers";
import { requireAdmin } from "@/lib/api-auth";
import { isValidEmail, isValidMobile } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const teacher = await getTeacherById(id);

    if (!teacher) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ teacher });
  } catch (error) {
    console.error("GET /api/teachers/[id] error:", error);
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

    const existing = await getTeacherById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    const body = await request.json();

    if (body.email && !isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (body.phone && !isValidMobile(body.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number — must be 10 digits" },
        { status: 400 }
      );
    }

    const teacher = await updateTeacher(id, {
      employeeId: body.employeeId,
      teacherName: body.teacherName,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      assignedClasses: body.assignedClasses,
      password: body.password,
      joiningDate: body.joiningDate,
      qualification: body.qualification,
      address: body.address,
      photoUrl: body.photoUrl,
      status: body.status,
    });

    return NextResponse.json({ teacher });
  } catch (error: unknown) {
    console.error("PUT /api/teachers/[id] error:", error);
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "A teacher with this employee ID already exists" },
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

    const existing = await getTeacherById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Teacher not found" },
        { status: 404 }
      );
    }

    await deleteTeacher(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/teachers/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
