import { NextResponse } from "next/server";
import { previewPromotion } from "@/lib/promotions";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const { fromClass, academicSession } = body;

    if (!fromClass || !academicSession) {
      return NextResponse.json(
        { error: "fromClass and academicSession are required" },
        { status: 400 }
      );
    }

    const result = await previewPromotion(fromClass, academicSession);
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/promotions/preview error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
