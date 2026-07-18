import { NextResponse } from "next/server";
import {
  getAchievers,
  createAchiever,
  getAchieverCount,
  getAchieverSessions,
  getAchieverClasses,
} from "@/lib/achievers";
import { uploadPhoto } from "@/lib/cloudinary";
import { getAdminFromRequest, requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const academicSession = searchParams.get("academicSession")
      ? Number(searchParams.get("academicSession"))
      : undefined;
    const className = searchParams.get("className") || undefined;
    const limit = searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : undefined;
    const publishedOnly = searchParams.get("publishedOnly") === "true";
    const isAdminRequest =
      searchParams.get("admin") === "true" || !publishedOnly;

    const admin = getAdminFromRequest(request);
    const showAll = !!admin && isAdminRequest;

    const achievers = await getAchievers({
      search,
      academicSession,
      className,
      limit,
      publishedOnly: !showAll,
    });

    const total = showAll
      ? await getAchieverCount()
      : await getAchievers({ publishedOnly: true, academicSession, className, search }).then(
          (a) => a.length
        );

    let sessions: number[] = [];
    let classes: string[] = [];
    if (showAll) {
      sessions = await getAchieverSessions();
      classes = await getAchieverClasses();
    }

    return NextResponse.json({ achievers, total, sessions, classes });
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

  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
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
      studentName,
      className,
      percentage,
      academicSession,
      rank: rankStr ? parseInt(rankStr, 10) : 0,
      photoUrl,
      achievementTitle: achievementTitle || "",
      isPublished,
      createdBy: admin.name,
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
