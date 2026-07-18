import { NextResponse } from "next/server";
import { clearParentAuthCookie } from "@/lib/parent-auth";

export async function POST() {
  await clearParentAuthCookie();
  return NextResponse.json({ success: true });
}
