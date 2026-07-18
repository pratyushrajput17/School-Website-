import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyParentToken } from "@/lib/parent-auth";
import { getStudentForParent, getHomeworkForStudent } from "@/lib/parent";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("parent_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyParentToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const student = await getStudentForParent(payload.studentId);
    if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });

    const homework = await getHomeworkForStudent(student.className, student.section);
    const pending = homework.filter((h) => new Date(h.dueDate) >= new Date()).length;

    return NextResponse.json({ count: pending });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
