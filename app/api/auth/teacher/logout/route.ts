import { NextResponse } from "next/server";
import { clearTeacherAuthCookie } from "@/lib/teacher-auth";

export async function POST() {
  await clearTeacherAuthCookie();
  return NextResponse.json({ success: true });
}
