import { NextResponse } from "next/server";
import {
  getAchieverById,
  updateAchiever,
  deleteAchiever,
} from "@/lib/achievers";
import { uploadPhoto, deleteImage, getPublicIdFromUrl } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const achiever = await getAchieverById(id);

    if (!achiever) {
      return NextResponse.json(
        { error: "Achiever not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ achiever });
  } catch (error) {
    console.error("GET /api/achievers/[id] error:", error);
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

    const existing = await getAchieverById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Achiever not found" },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const name = formData.get("name") as string | null;
    const className = formData.get("className") as string | null;
    const percentageStr = formData.get("percentage") as string | null;
    const yearStr = formData.get("year") as string | null;
    const file = formData.get("photo") as File | null;

    if (!name || !className || !percentageStr || !yearStr) {
      return NextResponse.json(
        { error: "Name, class, percentage, and year are required" },
        { status: 400 }
      );
    }

    const percentage = parseFloat(percentageStr);
    const year = parseInt(yearStr, 10);

    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      return NextResponse.json(
        { error: "Percentage must be between 0 and 100" },
        { status: 400 }
      );
    }

    if (isNaN(year) || year < 2000 || year > 2100) {
      return NextResponse.json(
        { error: "Invalid academic year" },
        { status: 400 }
      );
    }

    let photoUrl = existing.photo || undefined;

    if (file && file.size > 0) {
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "File must be an image" },
          { status: 400 }
        );
      }

      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Photo must be less than 2MB" },
          { status: 400 }
        );
      }

      try {
        if (existing.photo) {
          const publicId = getPublicIdFromUrl(existing.photo);
          if (publicId) {
            await deleteImage(publicId).catch(() => {});
          }
        }
        photoUrl = await uploadPhoto(file);
      } catch {
        return NextResponse.json(
          { error: "Failed to upload photo" },
          { status: 500 }
        );
      }
    }

    const achiever = await updateAchiever(id, {
      name,
      className,
      percentage,
      year,
      photo: photoUrl,
    });

    return NextResponse.json({ achiever });
  } catch (error) {
    console.error("PUT /api/achievers/[id] error:", error);
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

    const existing = await getAchieverById(id);
    if (!existing) {
      return NextResponse.json(
        { error: "Achiever not found" },
        { status: 404 }
      );
    }

    if (existing.photo) {
      const publicId = getPublicIdFromUrl(existing.photo);
      if (publicId) {
        await deleteImage(publicId).catch(() => {});
      }
    }

    await deleteAchiever(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/achievers/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
