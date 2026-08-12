import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { getParentFromRequest } from "@/lib/parent-auth";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);
  const parent = getParentFromRequest(request);

  if (!admin && !teacher && !parent) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const student = await prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        studentName: true,
        admissionNumber: true,
        scholarNumber: true,
        className: true,
        section: true,
        dateOfBirth: true,
        gender: true,
        admissionDate: true,
        fatherName: true,
        motherName: true,
        mobileNumber: true,
        alternateMobile: true,
        address: true,
        photoUrl: true,
        category: true,
        penNumber: true,
        status: true,
      },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    if (parent && parent.studentId !== student.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ student });
  } catch (error) {
    console.error("GET /api/students/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}