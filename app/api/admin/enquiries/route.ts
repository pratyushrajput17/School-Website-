import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/api-auth";
import { getEnquiries, getEnquiryStats } from "@/lib/enquiries";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const unauthorized = requireSuperAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;
    const enquiryType = searchParams.get("enquiryType") || undefined;
    const priority = searchParams.get("priority") || undefined;
    const dateFrom = searchParams.get("dateFrom") || undefined;
    const dateTo = searchParams.get("dateTo") || undefined;
    const limit = searchParams.get("limit")
      ? Math.min(Number(searchParams.get("limit")), 100)
      : 50;

    const result = await getEnquiries({
      search,
      status,
      enquiryType,
      priority,
      dateFrom,
      dateTo,
      limit,
    });

    const stats = await getEnquiryStats();

    return NextResponse.json({
      enquiries: result.enquiries,
      total: result.total,
      stats,
    });
  } catch (error) {
    console.error("GET /api/admin/enquiries error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
