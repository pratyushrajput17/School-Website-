import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyTeacherToken } from "@/lib/teacher-auth";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "@/lib/notifications";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("teacher_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyTeacherToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const notifications = await getNotifications({ teacherId: payload.id });
    return NextResponse.json({ notifications });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("teacher_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyTeacherToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();

    if (body.all) {
      const count = await markAllAsRead({ teacherId: payload.id });
      return NextResponse.json({ success: true, count });
    }

    if (!body.id) {
      return NextResponse.json(
        { error: "Notification ID required" },
        { status: 400 }
      );
    }

    const ok = await markAsRead(body.id, { teacherId: payload.id });
    if (!ok) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
