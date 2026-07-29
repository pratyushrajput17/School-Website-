import { NextResponse } from "next/server";
import { requireSuperAdmin, getAdminFromRequest } from "@/lib/api-auth";
import { getEnquiryById, updateEnquiry } from "@/lib/enquiries";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireSuperAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const enquiry = await getEnquiryById(id);

    if (!enquiry) {
      return NextResponse.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ enquiry });
  } catch (error) {
    console.error("GET /api/admin/enquiries/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireSuperAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const existing = await getEnquiryById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Enquiry not found" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const updateData: Record<string, unknown> = {};

    if (body.status) {
      const validStatuses = ["NEW", "IN_PROGRESS", "RESOLVED", "CLOSED"];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: "Invalid status value" },
          { status: 400 }
        );
      }
      updateData.status = body.status;

      if (body.status === "RESOLVED") {
        const admin = getAdminFromRequest(request);
        updateData.resolvedAt = new Date();
        updateData.resolvedBy = admin?.name || "Admin";
      }
    }

    if (body.priority) {
      const validPriorities = ["NORMAL", "IMPORTANT"];
      if (!validPriorities.includes(body.priority)) {
        return NextResponse.json(
          { error: "Invalid priority value" },
          { status: 400 }
        );
      }
      updateData.priority = body.priority;
    }

    if (body.markRead === true) {
      updateData.readAt = new Date();
    }

    if (body.markUnread === true) {
      updateData.readAt = null;
    }

    const enquiry = await updateEnquiry(id, updateData);

    return NextResponse.json({ enquiry });
  } catch (error) {
    console.error("PUT /api/admin/enquiries/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
