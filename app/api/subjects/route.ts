import { NextResponse } from "next/server";
import { getSubjects, createSubject } from "@/lib/subjects";
import { requireAdmin } from "@/lib/api-auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    const subjects = await getSubjects();
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { subjectName, subjectCode } = await request.json();
    if (!subjectName) {
      return NextResponse.json({ error: "subjectName is required" }, { status: 400 });
    }
    const subject = await createSubject({ subjectName, subjectCode });
    return NextResponse.json({ subject }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "A subject with this name already exists" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
