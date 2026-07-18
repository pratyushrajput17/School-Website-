import { NextResponse } from "next/server";
import { getEventById, updateEvent, deleteEvent } from "@/lib/events";
import { requireAdmin } from "@/lib/api-auth";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await getEventById(id);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (error) {
    console.error("GET /api/events/[id] error:", error);
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

  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.title || !body.description || !body.eventDate || !body.category) {
      return NextResponse.json(
        { error: "Title, description, event date, and category are required" },
        { status: 400 }
      );
    }

    const existing = await getEventById(id);
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const event = await updateEvent(id, {
      title: body.title,
      description: body.description,
      eventDate: body.eventDate,
      category: body.category,
      image: body.image || undefined,
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error("PUT /api/events/[id] error:", error);
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

    const existing = await getEventById(id);
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await deleteEvent(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/events/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
