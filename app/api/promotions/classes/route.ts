import { NextResponse } from "next/server";
import { getPromotableClasses } from "@/lib/promotions";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const classes = await getPromotableClasses();
    return NextResponse.json({ classes });
  } catch (error) {
    console.error("GET /api/promotions/classes error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
