import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyTeacherToken } from "@/lib/teacher-auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("teacher_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = verifyTeacherToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({
      teacher: {
        id: payload.id,
        employeeId: payload.employeeId,
        teacherName: payload.teacherName,
        assignedClasses: payload.assignedClasses,
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
