import { NextResponse } from "next/server";
import { getClasses, createClass } from "@/lib/classes";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const classes = await getClasses();
    return NextResponse.json({ classes });
  } catch (error) {
    console.error("GET /api/classes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { className } = await request.json();
    if (!className) {
      return NextResponse.json({ error: "className is required" }, { status: 400 });
    }
    const cls = await createClass(className);
    return NextResponse.json({ class: cls }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "A class with this name already exists" }, { status: 409 });
    }
    console.error("POST /api/classes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
