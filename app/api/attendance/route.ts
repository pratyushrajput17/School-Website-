import { NextResponse } from "next/server";
import { getAttendance, bulkMarkAttendance } from "@/lib/attendance";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const teacher = getTeacherFromRequest(request);
  const admin = getAdminFromRequest(request);
  if (!teacher && !admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || undefined;
  const startDate = searchParams.get("startDate") || undefined;
  const endDate = searchParams.get("endDate") || undefined;
  const className = searchParams.get("className") || undefined;
  const section = searchParams.get("section") || undefined;
  const studentId = searchParams.get("studentId") || undefined;
  const status = searchParams.get("status") || undefined;
  const limit = searchParams.get("limit")
    ? Number(searchParams.get("limit"))
    : undefined;

  try {
    const records = await getAttendance({
      date, startDate, endDate, className, section,
      studentId, status, limit,
    });
    return NextResponse.json({ records });
  } catch (error) {
    console.error("GET /api/attendance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);

  if (!admin && !teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const recordedBy = admin ? "admin" : teacher!.id;
  const { className, section, attendanceDate, records } = await request.json();

  if (!className || !section || !attendanceDate || !records || !Array.isArray(records)) {
    return NextResponse.json(
      { error: "className, section, attendanceDate, and records are required" },
      { status: 400 }
    );
  }

  if (teacher) {
    const assigned = (teacher.assignedClasses || "").split(",").map((c) => c.trim());
    if (!assigned.includes(className)) {
      return NextResponse.json(
        { error: "You are not assigned to this class" },
        { status: 403 }
      );
    }
  }

  try {
    const results = await bulkMarkAttendance(
      recordedBy,
      className,
      section,
      attendanceDate,
      records
    );
    return NextResponse.json({ records: results, count: results.length }, { status: 201 });
  } catch (error) {
    console.error("POST /api/attendance error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
