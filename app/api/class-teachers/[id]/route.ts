import { NextResponse } from "next/server";
import { deleteClassTeacher } from "@/lib/class-teachers";
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
    await deleteClassTeacher(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
