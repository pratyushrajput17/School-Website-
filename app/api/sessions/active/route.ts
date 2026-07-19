import { NextResponse } from "next/server";
import { getActiveSession, switchActiveSession } from "@/lib/academic-sessions";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const session = await getActiveSession();
    return NextResponse.json({ session });
  } catch (error) {
    console.error("GET /api/sessions/active error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 });
    }

    const session = await switchActiveSession(sessionId);
    return NextResponse.json({ session });
  } catch (error) {
    console.error("POST /api/sessions/active error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
