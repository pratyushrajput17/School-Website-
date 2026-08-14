import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/api-auth";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "@/lib/notifications";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const notifications = await getNotifications({ adminId: admin.id });
    return NextResponse.json({ notifications });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.all) {
      const count = await markAllAsRead({ adminId: admin.id });
      return NextResponse.json({ success: true, count });
    }

    if (!body.id) {
      return NextResponse.json(
        { error: "Notification ID required" },
        { status: 400 }
      );
    }

    const ok = await markAsRead(body.id, { adminId: admin.id });
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
