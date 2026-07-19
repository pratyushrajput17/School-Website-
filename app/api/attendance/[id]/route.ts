import { NextResponse } from "next/server";
import { getAttendanceById, deleteAttendance } from "@/lib/attendance";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { createAuditLog } from "@/lib/audit";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const record = await getAttendanceById(id);
    if (!record) {
      return NextResponse.json({ error: "Attendance record not found" }, { status: 404 });
    }
    return NextResponse.json({ record });
  } catch (error) {
    console.error("GET /api/attendance/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const admin = getAdminFromRequest(request);
  const { id } = await params;
  try {
    await deleteAttendance(id);

    if (admin) {
      await createAuditLog({
        action: "DELETE",
        entity: "Attendance",
        entityId: id,
        adminId: admin.id,
        adminName: admin.name,
        ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || undefined,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/attendance/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
