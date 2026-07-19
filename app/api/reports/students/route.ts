import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const className = searchParams.get("classId") || undefined;
    const section = searchParams.get("section") || undefined;
    const status = searchParams.get("status") || "Active";

    const where: Record<string, unknown> = {};
    if (className) where.className = className;
    if (section) where.section = section;
    if (status) where.status = status;

    const students = await prisma.student.findMany({
      where,
      orderBy: [{ className: "asc" }, { studentName: "asc" }],
    });

    const grouped: Record<string, typeof students> = {};
    for (const student of students) {
      const key = student.className || "Unassigned";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(student);
    }

    return NextResponse.json({ students, grouped, total: students.length });
  } catch (error) {
    console.error("GET /api/reports/students error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
