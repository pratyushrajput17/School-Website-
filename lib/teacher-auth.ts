import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-do-not-use-in-production";
const TOKEN_NAME = "teacher_token";
const TOKEN_EXPIRY = "24h";

export interface TeacherJWTPayload {
  id: string;
  employeeId: string;
  teacherName: string;
  assignedClasses: string;
}

export function generateTeacherToken(payload: TeacherJWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyTeacherToken(token: string): TeacherJWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TeacherJWTPayload;
  } catch {
    return null;
  }
}

export async function hashTeacherPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function compareTeacherPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function setTeacherAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearTeacherAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export function getTeacherFromRequest(request: Request): TeacherJWTPayload | null {
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/teacher_token=([^;]+)/);
  const token = match ? decodeURIComponent(match[1]) : null;
  if (!token) return null;
  return verifyTeacherToken(token);
}

export function requireTeacher(request: Request): Response | null {
  const teacher = getTeacherFromRequest(request);
  if (!teacher) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}
