// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/_next",
    "/favicon.ico",
    "/api/auth",
  ];

  // Allow public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Role-based redirect logic
  if (pathname === "/admin" || pathname === "/super_admin") {
    return NextResponse.redirect(new URL("/admin/environments", request.url));
  }

  if (pathname === "/commercial") {
    return NextResponse.redirect(new URL("/commercial/clients", request.url));
  }

  if (pathname === "/decideur") {
    return NextResponse.redirect(new URL("/decideur/dashboard", request.url));
  }

  return NextResponse.next();
}
