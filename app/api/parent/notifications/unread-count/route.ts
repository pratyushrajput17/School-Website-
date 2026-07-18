import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyParentToken } from "@/lib/parent-auth";
import { getUnreadNotificationCount } from "@/lib/parent";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("parent_token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = verifyParentToken(token);
    if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const count = await getUnreadNotificationCount(payload.id);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
