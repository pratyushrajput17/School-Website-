import { NextResponse } from "next/server";
import {
  getAchievers,
  createAchiever,
  getAchieverCount,
} from "@/lib/achievers";
import { uploadPhoto } from "@/lib/cloudinary";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const year = searchParams.get("year")
      ? Number(searchParams.get("year"))
      : undefined;
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined;

    const achievers = await getAchievers({ search, year, limit });
    const total = await getAchieverCount();

    return NextResponse.json({ achievers, total });
  } catch (error) {
    console.error("GET /api/achievers error:", error);
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

    let photoUrl: string | undefined;

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
        photoUrl = await uploadPhoto(file);
      } catch {
        return NextResponse.json(
          { error: "Failed to upload photo" },
          { status: 500 }
        );
      }
    }

    const achiever = await createAchiever({
      name,
      className,
      percentage,
      year,
      photo: photoUrl,
    });

    return NextResponse.json({ achiever }, { status: 201 });
  } catch (error) {
    console.error("POST /api/achievers error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
