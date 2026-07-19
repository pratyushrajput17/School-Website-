import { NextResponse } from "next/server";
import { getSessions, createSession } from "@/lib/academic-sessions";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sessions = await getSessions();
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("GET /api/sessions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { name, startYear, endYear, isActive } = body;

    if (!name || !startYear || !endYear) {
      return NextResponse.json(
        { error: "name, startYear, and endYear are required" },
        { status: 400 }
      );
    }

    const session = await createSession({ name, startYear, endYear, isActive });
    return NextResponse.json({ session }, { status: 201 });
  } catch (error) {
    console.error("POST /api/sessions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
