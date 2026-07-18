import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyParentToken } from "@/lib/parent-auth";
import { getStudentForParent } from "@/lib/parent";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("parent_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = verifyParentToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const student = await getStudentForParent(payload.studentId);

    return NextResponse.json({
      parent: {
        id: payload.id,
        mobileNumber: payload.mobileNumber,
        fatherName: payload.fatherName,
        studentId: payload.studentId,
      },
      student: student ? {
        id: student.id,
        studentName: student.studentName,
        className: student.className,
        section: student.section,
        admissionNumber: student.admissionNumber,
        photoUrl: student.photoUrl,
      } : null,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
