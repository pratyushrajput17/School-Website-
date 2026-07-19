import { NextResponse } from "next/server";
import { revertPromotion } from "@/lib/promotions";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const result = await revertPromotion(id);

    if (!result) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
    }

    return NextResponse.json({ revertedCount: result.revertedCount });
  } catch (error) {
    console.error("POST /api/promotions/[id]/revert error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
