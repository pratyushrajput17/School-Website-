import { NextResponse } from "next/server";
import { getPromotions, executePromotion } from "@/lib/promotions";
import { createAuditLog } from "@/lib/audit";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const promotions = await getPromotions();
    return NextResponse.json({ promotions });
  } catch (error) {
    console.error("GET /api/promotions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const admin = getAdminFromRequest(request);

  try {
    const body = await request.json();
    const { fromClass, toClass, academicSession } = body;

    if (!fromClass || !toClass || !academicSession) {
      return NextResponse.json(
        { error: "fromClass, toClass, and academicSession are required" },
        { status: 400 }
      );
    }

    const promotion = await executePromotion(
      fromClass,
      toClass,
      academicSession,
      admin?.name || "Admin"
    );

    await createAuditLog({
      action: "PROMOTE",
      entity: "Student",
      adminId: admin?.id,
      adminName: admin?.name,
      details: JSON.stringify({ fromClass, toClass, academicSession, studentCount: promotion.promotedCount }),
    });

    return NextResponse.json({ promotion }, { status: 201 });
  } catch (error) {
    console.error("POST /api/promotions error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
