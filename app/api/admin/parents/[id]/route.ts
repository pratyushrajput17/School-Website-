import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { hashParentPassword } from "@/lib/parent-auth";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    const parent = await prisma.parent.findUnique({
      where: { id },
      include: {
        student: {
          select: { studentName: true, className: true, section: true, admissionNumber: true },
        },
      },
    });
    if (!parent) return NextResponse.json({ error: "Parent not found" }, { status: 404 });
    return NextResponse.json({ parent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    const body = await request.json();
    const data: Record<string, unknown> = {
      fatherName: body.fatherName,
      motherName: body.motherName,
      mobileNumber: body.mobileNumber,
      email: body.email,
      studentId: body.studentId,
      status: body.status,
    };
    if (body.password) {
      data.password = await hashParentPassword(body.password);
    }

    const parent = await prisma.parent.update({
      where: { id },
      data,
      include: {
        student: {
          select: { studentName: true, className: true, section: true },
        },
      },
    });

    return NextResponse.json({ parent });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && (error as { code: string }).code === "P2002") {
      return NextResponse.json({ error: "Duplicate entry" }, { status: 409 });
    }
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(request);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  try {
    await prisma.parent.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
