import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production";
const TOKEN_NAME = "parent_token";
const TOKEN_EXPIRY = "24h";

export interface ParentJWTPayload {
  id: string;
  mobileNumber: string;
  fatherName: string;
  studentId: string;
}

export function generateParentToken(payload: ParentJWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyParentToken(token: string): ParentJWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as ParentJWTPayload;
  } catch {
    return null;
  }
}

export async function hashParentPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function compareParentPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function setParentAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearParentAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getParentFromRequest(request: Request): ParentJWTPayload | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/parent_token=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;
  if (!token) return null;
  return verifyParentToken(token);
}
