import { NextResponse } from "next/server";
import {
  getAchieverById,
  updateAchiever,
  deleteAchiever,
} from "@/lib/achievers";
import { uploadPhoto, deleteImage, getPublicIdFromUrl } from "@/lib/cloudinary";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";

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

  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
    const studentName = formData.get("studentName") as string | null;
    const className = formData.get("className") as string | null;
    const percentageStr = formData.get("percentage") as string | null;
    const academicSessionStr = formData.get("academicSession") as string | null;
    const rankStr = formData.get("rank") as string | null;
    const achievementTitle = formData.get("achievementTitle") as string | null;
    const isPublished = formData.get("isPublished") === "true";
    const file = formData.get("photoUrl") as File | null;

    if (!studentName || !className || !percentageStr || !academicSessionStr) {
      return NextResponse.json(
        { error: "Student name, class, percentage, and academic session are required" },
        { status: 400 }
      );
    }

    const percentage = parseFloat(percentageStr);
    const academicSession = parseInt(academicSessionStr, 10);

    if (isNaN(percentage) || percentage < 0 || percentage > 100) {
      return NextResponse.json(
        { error: "Percentage must be between 0 and 100" },
        { status: 400 }
      );
    }

    if (isNaN(academicSession) || academicSession < 2000 || academicSession > 2100) {
      return NextResponse.json(
        { error: "Invalid academic session" },
        { status: 400 }
      );
    }

    let photoUrl = existing.photoUrl || undefined;

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
        if (existing.photoUrl) {
          const publicId = getPublicIdFromUrl(existing.photoUrl);
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
      studentName,
      className,
      percentage,
      academicSession,
      rank: rankStr ? parseInt(rankStr, 10) : undefined,
      photoUrl,
      achievementTitle: achievementTitle ?? undefined,
      isPublished,
      updatedBy: admin.name,
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

    if (existing.photoUrl) {
      const publicId = getPublicIdFromUrl(existing.photoUrl);
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
