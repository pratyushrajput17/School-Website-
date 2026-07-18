import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { hashParentPassword } from "@/lib/parent-auth";

export async function GET(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const parents = await prisma.parent.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(search ? {
          OR: [
            { fatherName: { contains: search, mode: "insensitive" } },
            { motherName: { contains: search, mode: "insensitive" } },
            { mobileNumber: { contains: search } },
          ],
        } : {}),
      },
      include: {
        student: {
          select: { studentName: true, className: true, section: true, admissionNumber: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ parents });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  try {
    const { fatherName, motherName, mobileNumber, email, studentId, password } = await request.json();

    if (!fatherName || !mobileNumber || !studentId || !password) {
      return NextResponse.json({ error: "fatherName, mobileNumber, studentId, and password are required" }, { status: 400 });
    }

    const existing = await prisma.parent.findUnique({ where: { mobileNumber } });
    if (existing) {
      return NextResponse.json({ error: "A parent with this mobile number already exists" }, { status: 409 });
    }

    const existingStudent = await prisma.parent.findUnique({ where: { studentId } });
    if (existingStudent) {
      return NextResponse.json({ error: "This student already has a parent account" }, { status: 409 });
    }

    const hashedPassword = await hashParentPassword(password);

    const parent = await prisma.parent.create({
      data: {
        fatherName, motherName: motherName || "", mobileNumber,
        email: email || "", studentId, password: hashedPassword,
      },
      include: {
        student: {
          select: { studentName: true, className: true, section: true },
        },
      },
    });

    return NextResponse.json({ parent }, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "Duplicate entry" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
