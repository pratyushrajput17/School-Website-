import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyTeacherToken } from "@/lib/teacher-auth";
import { getUnreadCount } from "@/lib/notifications";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("teacher_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyTeacherToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const count = await getUnreadCount({ teacherId: payload.id });
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
