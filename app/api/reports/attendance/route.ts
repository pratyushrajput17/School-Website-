import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const classId = searchParams.get("classId") || undefined;
    const section = searchParams.get("section") || undefined;

    const where: Record<string, unknown> = {};
    if (classId) where.classId = classId;
    if (section) where.section = section;
    if (from || to) {
      where.attendanceDate = {};
      if (from) (where.attendanceDate as Record<string, unknown>).gte = new Date(from);
      if (to) (where.attendanceDate as Record<string, unknown>).lte = new Date(to);
    }

    const records = await prisma.attendance.findMany({
      where,
      orderBy: { attendanceDate: "desc" },
    });

    const totalRecords = records.length;
    const presentCount = records.filter((r) => r.status === "Present").length;
    const absentCount = records.filter((r) => r.status === "Absent").length;
    const overallRate = totalRecords > 0 ? (presentCount / totalRecords) * 100 : 0;

    const byClass: Record<string, { total: number; present: number; rate: number }> = {};
    for (const record of records) {
      const key = record.className || "Unknown";
      if (!byClass[key]) byClass[key] = { total: 0, present: 0, rate: 0 };
      byClass[key].total++;
      if (record.status === "Present") byClass[key].present++;
    }
    for (const key of Object.keys(byClass)) {
      byClass[key].rate =
        byClass[key].total > 0
          ? (byClass[key].present / byClass[key].total) * 100
          : 0;
    }

    return NextResponse.json({
      totalRecords,
      presentCount,
      absentCount,
      overallRate,
      byClass,
    });
  } catch (error) {
    console.error("GET /api/reports/attendance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
