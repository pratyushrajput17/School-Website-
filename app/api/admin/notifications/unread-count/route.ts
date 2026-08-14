import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/api-auth";
import { getUnreadCount } from "@/lib/notifications";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const count = await getUnreadCount({ adminId: admin.id });
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
