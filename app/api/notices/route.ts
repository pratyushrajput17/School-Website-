import { NextResponse } from "next/server";
import { getNotices, createNotice, getNoticeCount } from "@/lib/notices";
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

    const notices = await getNotices({
      category,
      search,
      limit,
      publishedOnly: !showAll,
    });

    const total = showAll
      ? await getNoticeCount()
      : await getNotices({ publishedOnly: true, category, search }).then(
          (n) => n.length
        );

    return NextResponse.json({ notices, total });
  } catch (error) {
    console.error("GET /api/notices error:", error);
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

    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Title, description, and category are required" },
        { status: 400 }
      );
    }

    const notice = await createNotice({
      title: body.title,
      description: body.description,
      category: body.category,
      isPublished: body.isPublished ?? false,
      createdBy: admin.name,
    });

    return NextResponse.json({ notice }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notices error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
