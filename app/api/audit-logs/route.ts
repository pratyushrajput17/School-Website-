import { NextResponse } from "next/server";
import { getAuditLogs, getAuditStats, clearAuditLogs } from "@/lib/audit";
import { requireAdmin, requireSuperAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const entity = searchParams.get("entity") || undefined;
    const action = searchParams.get("action") || undefined;
    const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 100;
    const offset = searchParams.get("offset") ? Number(searchParams.get("offset")) : 0;

    const { logs, total } = await getAuditLogs({ entity, action, limit, offset });
    const stats = await getAuditStats();

    return NextResponse.json({ logs, total, stats });
  } catch (error) {
    console.error("GET /api/audit-logs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const unauthorized = requireSuperAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    await clearAuditLogs();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/audit-logs error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
