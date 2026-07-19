import { NextResponse } from "next/server";
import { getStudentReportCard } from "@/lib/report-card";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getTeacherFromRequest } from "@/lib/teacher-auth";
import { verifyParentToken } from "@/lib/parent-auth";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ studentId: string }> }
) {
  const admin = getAdminFromRequest(request);
  const teacher = getTeacherFromRequest(request);

  const cookieHeader = request.headers.get("cookie") || "";
  const parentMatch = cookieHeader.match(/parent_token=([^;]+)/);
  const parentToken = parentMatch ? decodeURIComponent(parentMatch[1]) : null;
  const parent = parentToken ? verifyParentToken(parentToken) : null;

  if (!admin && !teacher && !parent) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { studentId } = await params;

    if (parent && parent.studentId !== studentId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const reportCard = await getStudentReportCard(studentId);

    if (!reportCard) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ reportCard });
  } catch (error) {
    console.error("GET /api/results/report-card/[studentId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
