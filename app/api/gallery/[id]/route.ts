import { NextResponse } from "next/server";
import {
  getGalleryImageById,
  updateGalleryImage,
  deleteGalleryImage,
} from "@/lib/gallery";
import { uploadImage, deleteImage, getPublicIdFromUrl } from "@/lib/cloudinary";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const image = await getGalleryImageById(id);

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ image });
  } catch (error) {
    console.error("GET /api/gallery/[id] error:", error);
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

    const existing = await getGalleryImageById(id);
    if (!existing) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const category = formData.get("category") as string | null;
    const file = formData.get("image") as File | null;

    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }

    let imageUrl = existing.imageUrl;

    if (file && file.size > 0) {
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

      try {
        const publicId = getPublicIdFromUrl(existing.imageUrl);
        if (publicId) {
          await deleteImage(publicId).catch(() => {});
        }
        imageUrl = await uploadImage(file);
      } catch {
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    const image = await updateGalleryImage(id, {
      title,
      imageUrl,
      category,
      updatedBy: admin.name,
    });

    return NextResponse.json({ image });
  } catch (error) {
    console.error("PUT /api/gallery/[id] error:", error);
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

    const existing = await getGalleryImageById(id);
    if (!existing) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const publicId = getPublicIdFromUrl(existing.imageUrl);
    if (publicId) {
      await deleteImage(publicId).catch(() => {});
    }

    await deleteGalleryImage(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
