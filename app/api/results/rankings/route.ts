import { NextResponse } from "next/server";
import { getExamRankings } from "@/lib/report-card";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);
  if (!admin && !teacher) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const examId = searchParams.get("examId");

    if (!examId) {
      return NextResponse.json({ error: "examId is required" }, { status: 400 });
    }

    const rankings = await getExamRankings(examId);

    return NextResponse.json(rankings);
  } catch (error) {
    console.error("GET /api/results/rankings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
