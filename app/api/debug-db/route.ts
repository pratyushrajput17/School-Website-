import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const count = await prisma.admin.count();
    return NextResponse.json({ ok: true, adminCount: count, dbUrl: process.env.DATABASE_URL ? "SET" : "EMPTY" });
  } catch (error: unknown) {
    const err = error as { message?: string; code?: string; name?: string; meta?: unknown };
    return NextResponse.json({
      ok: false,
      error: err.message,
      code: err.code,
      name: err.name,
      meta: err.meta,
      dbUrl: process.env.DATABASE_URL ? "SET" : "EMPTY",
    });
  }
}
