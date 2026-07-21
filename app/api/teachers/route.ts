import { NextResponse } from "next/server";
import {
  getTeachers,
  createTeacher,
  getTeacherCount,
  getTeacherSubjects,
  getTeachersPerSubject,
} from "@/lib/teachers";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { isValidEmail, isValidMobile } from "@/lib/validation";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const subject = searchParams.get("subject") || undefined;
    const assignedClass = searchParams.get("assignedClass") || undefined;
    const status = searchParams.get("status") || undefined;
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined;

    const teachers = await getTeachers({
      search,
      subject,
      assignedClass,
      status,
      limit,
    });
    const total = await getTeacherCount();
    const subjects = await getTeacherSubjects();
    const activeCount = await getTeacherCount({ status: "Active" });
    const teachersPerSubject = await getTeachersPerSubject();

    return NextResponse.json({
      teachers,
      total,
      subjects,
      activeCount,
      teachersPerSubject,
    });
  } catch (error) {
    console.error("GET /api/teachers error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const {
      employeeId,
      teacherName,
      email,
      phone,
      subject,
      assignedClasses,
      password,
      joiningDate,
      qualification,
      address,
      photoUrl,
      status,
    } = body;

    if (
      !employeeId ||
      !teacherName ||
      !email ||
      !phone ||
      !subject ||
      !joiningDate ||
      !qualification ||
      !address ||
      !password
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (!isValidMobile(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number — must be 10 digits" },
        { status: 400 }
      );
    }

    const teacher = await createTeacher({
      employeeId,
      teacherName,
      email,
      phone,
      subject,
      assignedClasses,
      password,
      joiningDate,
      qualification,
      address,
      photoUrl,
      status: status || "Active",
    });

    const admin = getAdminFromRequest(request);
    if (admin) {
      await createAuditLog({
        action: "CREATE",
        entity: "Teacher",
        entityId: teacher.id,
        adminId: admin.id,
        adminName: admin.name,
        details: JSON.stringify({ employeeId, teacherName, subject }),
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ teacher }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/teachers error:", error);
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
