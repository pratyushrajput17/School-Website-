import { NextResponse } from "next/server";
import { getSubjectById, updateSubject, deleteSubject } from "@/lib/subjects";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const subject = await getSubjectById(id);
    if (!subject) return NextResponse.json({ error: "Subject not found" }, { status: 404 });
    return NextResponse.json({ subject });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    const body = await request.json();
    const subject = await updateSubject(id, { subjectName: body.subjectName, subjectCode: body.subjectCode, status: body.status });
    return NextResponse.json({ subject });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "A subject with this name already exists" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await deleteSubject(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
