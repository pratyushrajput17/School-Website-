import { NextResponse } from "next/server";
import { getEventById, updateEvent, deleteEvent } from "@/lib/events";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";
import { sendContentNotification } from "@/lib/notifications";

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

  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await getEventById(id);
    if (!existing) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const event = await updateEvent(id, {
      title: body.title,
      description: body.description,
      eventDate: body.eventDate,
      category: body.category,
      image: body.image,
      isPublished: body.isPublished,
      updatedBy: admin.name,
    });

    const wasPublished = existing.isPublished;
    const nowPublished = event.isPublished;

    if (
      nowPublished &&
      !wasPublished &&
      (body.notifyParents || body.notifyTeachers)
    ) {
      const eventDate = new Date(event.eventDate);
      await sendContentNotification({
        type: "EVENT",
        title: `Event: ${event.title}`,
        message: `${event.description} Event date: ${eventDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}.`,
        sentBy: `${admin.name} (Admin)`,
        entityType: "EVENT",
        entityId: event.id,
        audience: {
          notifyParents: !!body.notifyParents,
          notifyTeachers: !!body.notifyTeachers,
        },
      });
    }

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
