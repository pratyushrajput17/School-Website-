import { NextResponse } from "next/server";
import { getSubjectAssignments, upsertSubjectAssignment, deleteSubjectAssignment } from "@/lib/subject-assignments";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const classId = searchParams.get("classId") || undefined;
    const sectionId = searchParams.get("sectionId") || undefined;
    const teacherId = searchParams.get("teacherId") || undefined;

    const assignments = await getSubjectAssignments({ classId, sectionId, teacherId });
    return NextResponse.json({ assignments });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { classId, sectionId, subjectId, teacherId } = await request.json();
    if (!classId || !sectionId || !subjectId || !teacherId) {
      return NextResponse.json({ error: "classId, sectionId, subjectId, and teacherId are required" }, { status: 400 });
    }
    const assignment = await upsertSubjectAssignment({ classId, sectionId, subjectId, teacherId });
    return NextResponse.json({ assignment }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "This assignment already exists" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
