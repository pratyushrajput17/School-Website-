import { NextResponse } from "next/server";
import {
  getStudents,
  createStudent,
  getStudentCount,
  getStudentClasses,
  getStudentSections,
  getStudentsPerClass,
} from "@/lib/students";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { isValidMobile } from "@/lib/validation";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const className = searchParams.get("className") || undefined;
    const section = searchParams.get("section") || undefined;
    const status = searchParams.get("status") || undefined;
    const limit = searchParams.get("limit")
      ? Math.min(Number(searchParams.get("limit")), 500)
      : 200;

    const students = await getStudents({
      search,
      className,
      section,
      status,
      limit,
    });
    const total = await getStudentCount();
    const classes = await getStudentClasses();
    const sections = await getStudentSections();
    const activeCount = await getStudentCount({ status: "Active" });
    const studentsPerClass = await getStudentsPerClass();

    return NextResponse.json({
      students,
      total,
      classes,
      sections,
      activeCount,
      studentsPerClass,
    });
  } catch (error) {
    console.error("GET /api/students error:", error);
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
      admissionNumber,
      studentName,
      fatherName,
      motherName,
      mobileNumber,
      alternateMobile,
      dateOfBirth,
      gender,
      className,
      section,
      address,
      status,
      admissionDate,
      photoUrl,
    } = body;

    if (
      !admissionNumber ||
      !studentName ||
      !fatherName ||
      !motherName ||
      !mobileNumber ||
      !className ||
      !section ||
      !dateOfBirth ||
      !address ||
      !admissionDate
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 }
      );
    }

    if (!isValidMobile(mobileNumber)) {
      return NextResponse.json(
        { error: "Invalid mobile number — must be 10 digits" },
        { status: 400 }
      );
    }

    const student = await createStudent({
      admissionNumber,
      studentName,
      fatherName,
      motherName,
      mobileNumber,
      alternateMobile,
      dateOfBirth,
      gender,
      className,
      section,
      address,
      status: status || "Active",
      admissionDate,
      photoUrl,
    });

    const admin = getAdminFromRequest(request);
    if (admin) {
      await createAuditLog({
        action: "CREATE",
        entity: "Student",
        entityId: student.id,
        adminId: admin.id,
        adminName: admin.name,
        details: JSON.stringify({ admissionNumber, studentName, className, section }),
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ student }, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/students error:", error);
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
