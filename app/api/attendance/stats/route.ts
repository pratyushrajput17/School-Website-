import { NextResponse } from "next/server";
import { getAttendanceStats, getTodaysAttendanceSummary } from "@/lib/attendance";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || undefined;
    const startDate = searchParams.get("startDate") || undefined;
    const endDate = searchParams.get("endDate") || undefined;
    const className = searchParams.get("className") || undefined;
    const section = searchParams.get("section") || undefined;

    const stats = date || startDate
      ? await getAttendanceStats({ date, startDate, endDate, className, section })
      : await getTodaysAttendanceSummary();

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("GET /api/attendance/stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
