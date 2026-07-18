import { NextResponse } from "next/server";
import { getClassTeachers, upsertClassTeacher, deleteClassTeacher } from "@/lib/class-teachers";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const assignments = await getClassTeachers();
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
    const { classId, sectionId, teacherId } = await request.json();
    if (!classId || !sectionId || !teacherId) {
      return NextResponse.json({ error: "classId, sectionId, and teacherId are required" }, { status: 400 });
    }
    const assignment = await upsertClassTeacher({ classId, sectionId, teacherId });
    return NextResponse.json({ assignment }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "This class-section combination already has a class teacher" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
