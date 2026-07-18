import { NextResponse } from "next/server";
import { getNoticeById, updateNotice, deleteNotice } from "@/lib/notices";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const notice = await getNoticeById(id);

    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ notice });
  } catch (error) {
    console.error("GET /api/notices/[id] error:", error);
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
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await getNoticeById(id);
    if (!existing) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    const notice = await updateNotice(id, {
      title: body.title,
      description: body.description,
      category: body.category,
      isPublished: body.isPublished,
      updatedBy: admin.name,
    });

    return NextResponse.json({ notice });
  } catch (error) {
    console.error("PUT /api/notices/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;

    const existing = await getNoticeById(id);
    if (!existing) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    await deleteNotice(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/notices/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
