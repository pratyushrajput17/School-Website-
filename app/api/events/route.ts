import { NextResponse } from "next/server";
import { getEvents, createEvent, getEventCount } from "@/lib/events";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined;
    const publishedOnly = searchParams.get("publishedOnly") === "true";
    const isAdminRequest =
      searchParams.get("admin") === "true" || !publishedOnly;

    const admin = getAdminFromRequest(request);
    const showAll = !!admin && isAdminRequest;

    const events = await getEvents({
      category,
      search,
      limit,
      publishedOnly: !showAll,
    });

    const total = showAll
      ? await getEventCount()
      : await getEvents({ publishedOnly: true, category, search }).then(
          (e) => e.length
        );

    return NextResponse.json({ events, total });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (!body.title || !body.description || !body.eventDate || !body.category) {
      return NextResponse.json(
        { error: "Title, description, event date, and category are required" },
        { status: 400 }
      );
    }

    const event = await createEvent({
      title: body.title,
      description: body.description,
      eventDate: body.eventDate,
      category: body.category,
      image: body.image || undefined,
      isPublished: body.isPublished ?? false,
      createdBy: admin.name,
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
