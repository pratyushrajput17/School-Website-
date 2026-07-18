import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";
import { verifyTeacherToken } from "./lib/teacher-auth";

const protectedPaths = ["/admin"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  const isTeacherPath = pathname === "/teacher" || pathname.startsWith("/teacher/");

  if (isTeacherPath) {
    const token = request.cookies.get("teacher_token")?.value;
    const isValid = token ? verifyTeacherToken(token) : null;

    if (!isValid && pathname !== "/teacher/login") {
      const loginUrl = new URL("/teacher/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isValid && pathname === "/teacher/login") {
      return NextResponse.redirect(new URL("/teacher/attendance", request.url));
    }

    return NextResponse.next();
  }

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  const isValid = token ? verifyToken(token) : null;

  if (!isValid) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/teacher/:path*", "/teacher"],
};
