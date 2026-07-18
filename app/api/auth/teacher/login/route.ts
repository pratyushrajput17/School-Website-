import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  compareTeacherPassword,
  generateTeacherToken,
  setTeacherAuthCookie,
} from "@/lib/teacher-auth";

export async function POST(request: Request) {
  try {
    const { employeeId, password } = await request.json();

    if (!employeeId || !password) {
      return NextResponse.json(
        { error: "Employee ID and password are required" },
        { status: 400 }
      );
    }

    const teacher = await prisma.teacher.findUnique({ where: { employeeId } });

    if (!teacher || !teacher.password) {
      return NextResponse.json(
        { error: "Invalid employee ID or password" },
        { status: 401 }
      );
    }

    const isValid = await compareTeacherPassword(password, teacher.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid employee ID or password" },
        { status: 401 }
      );
    }

    if (teacher.status === "Inactive") {
      return NextResponse.json(
        { error: "Account deactivated. Contact admin." },
        { status: 403 }
      );
    }

    const token = generateTeacherToken({
      id: teacher.id,
      employeeId: teacher.employeeId,
      teacherName: teacher.teacherName,
      assignedClasses: teacher.assignedClasses,
    });

    await setTeacherAuthCookie(token);

    return NextResponse.json({
      success: true,
      teacher: {
        id: teacher.id,
        employeeId: teacher.employeeId,
        teacherName: teacher.teacherName,
        assignedClasses: teacher.assignedClasses,
      },
    });
  } catch (error) {
    console.error("Teacher login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
