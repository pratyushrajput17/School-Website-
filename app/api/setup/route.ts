import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST() {
  try {
    const existingAdmin = await prisma.admin.findFirst();

    if (existingAdmin) {
      return NextResponse.json({ message: "Already configured", seeded: false });
    }

    const hashedPassword = await hashPassword("Adarsh2111");

    const admin = await prisma.admin.create({
      data: {
        name: "Super Admin",
        email: "rajputpratyush33@gmail.com",
        password: hashedPassword,
        role: "super_admin",
      },
    });

    return NextResponse.json({
      message: "Admin seeded successfully",
      seeded: true,
      admin: { id: admin.id, email: admin.email, role: admin.role },
    });
  } catch (error) {
    console.error("Setup error:", error);
    const detail = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Setup failed", detail }, { status: 500 });
  }
}
