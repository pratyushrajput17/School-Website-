import { NextResponse } from "next/server";
import { getSections, createSection } from "@/lib/sections";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sections = await getSections();
    return NextResponse.json({ sections });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { sectionName } = await request.json();
    if (!sectionName) {
      return NextResponse.json({ error: "sectionName is required" }, { status: 400 });
    }
    const section = await createSection(sectionName);
    return NextResponse.json({ section }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "A section with this name already exists" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
