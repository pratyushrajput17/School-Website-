import { NextResponse } from "next/server";
import { verifyToken } from "./auth";

export function getAdminFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/admin_token=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;

  if (!token) return null;
  return verifyToken(token);
}

export function requireAdmin(request: Request) {
  const admin = getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
