import { NextResponse } from "next/server";
import { getSetting, setSetting } from "@/lib/settings";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { key } = await params;
    const value = await getSetting(key);
    return NextResponse.json({ value });
  } catch (error) {
    console.error("GET /api/settings/[key] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { key } = await params;
    const body = await request.json();
    const { value } = body;

    if (value === undefined || value === null) {
      return NextResponse.json({ error: "value is required" }, { status: 400 });
    }

    await setSetting(key, String(value));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT /api/settings/[key] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
