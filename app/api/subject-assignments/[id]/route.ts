import { NextResponse } from "next/server";
import { deleteSubjectAssignment } from "@/lib/subject-assignments";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await deleteSubjectAssignment(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
