import { NextResponse } from "next/server";
import { getHomework } from "@/lib/homework";
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
    const sectionId = searchParams.get("sectionId") || undefined;

    const allHomework = await getHomework({ classId, sectionId });

    let filtered = allHomework;
    if (from) {
      const fromDate = new Date(from);
      filtered = filtered.filter((h) => new Date(h.createdAt) >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      filtered = filtered.filter((h) => new Date(h.createdAt) <= toDate);
    }

    const byClass: Record<string, number> = {};
    const bySubject: Record<string, number> = {};
    const byTeacher: Record<string, number> = {};

    for (const hw of filtered) {
      const classKey = hw.class?.className || "Unknown";
      const subjectKey = hw.subject?.subjectName || "Unknown";
      const teacherKey = hw.teacher?.teacherName || "Unknown";

      byClass[classKey] = (byClass[classKey] || 0) + 1;
      bySubject[subjectKey] = (bySubject[subjectKey] || 0) + 1;
      byTeacher[teacherKey] = (byTeacher[teacherKey] || 0) + 1;
    }

    return NextResponse.json({
      total: filtered.length,
      byClass,
      bySubject,
      byTeacher,
    });
  } catch (error) {
    console.error("GET /api/reports/homework error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
