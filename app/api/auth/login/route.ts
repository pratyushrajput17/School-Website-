import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, generateToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, admin.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    let message = "Internal server error";
    if (error instanceof Error) {
      if (error.message?.includes("database") || error.message?.includes("connect")) {
        message = "Database connection failed. Check DATABASE_URL.";
      } else if (error.message?.includes("cookies")) {
        message = "Auth cookie error.";
      }
    }
    if (!process.env.DATABASE_URL) {
      message = "Database not configured. Set DATABASE_URL in environment variables.";
    }
    return NextResponse.json({ error: message, detail: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
