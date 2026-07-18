import { NextResponse } from "next/server";
import {
  getGalleryImages,
  createGalleryImage,
  getGalleryCount,
} from "@/lib/gallery";
import { uploadImage } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined;

    const images = await getGalleryImages({ category, search, limit });
    const total = await getGalleryCount();

    return NextResponse.json({ images, total });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const category = formData.get("category") as string | null;
    const file = formData.get("image") as File | null;

    if (!title || !category || !file) {
      return NextResponse.json(
        { error: "Title, category, and image are required" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be less than 5MB" },
        { status: 400 }
      );
    }

    let imageUrl: string;

    try {
      imageUrl = await uploadImage(file);
    } catch {
      return NextResponse.json(
        { error: "Failed to upload image. Check Cloudinary configuration." },
        { status: 500 }
      );
    }

    const image = await createGalleryImage({
      title,
      image: imageUrl,
      category,
    });

    return NextResponse.json({ image }, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
