import { NextResponse } from "next/server";
import { getResultById, upsertResult, deleteResult } from "@/lib/results";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const existing = await getResultById(id);
    if (!existing) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    const body = await request.json();
    const { marksObtained, maximumMarks, grade, remarks } = body;

    const result = await upsertResult({
      studentId: existing.studentId,
      examId: existing.examId,
      subjectId: existing.subjectId,
      marksObtained: marksObtained ?? existing.marksObtained,
      maximumMarks: maximumMarks ?? existing.maximumMarks,
      grade,
      remarks,
    });

    const admin = getAdminFromRequest(request);
    if (admin) {
      await createAuditLog({
        action: "UPDATE",
        entity: "Result",
        entityId: id,
        adminId: admin.id,
        adminName: admin.name,
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("PUT /api/results/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const existing = await getResultById(id);
    if (!existing) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    await deleteResult(id);

    const admin = getAdminFromRequest(request);
    if (admin) {
      await createAuditLog({
        action: "DELETE",
        entity: "Result",
        entityId: id,
        adminId: admin.id,
        adminName: admin.name,
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/results/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
