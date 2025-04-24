import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/_next",
    "/favicon.ico",
    "/api/auth",
  ];

  // Skip middleware for public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Get the user cookie from the request
  const userCookie = request.cookies.get("user")?.value;
  if (!userCookie) {
    // Redirect to login if no user cookie exists
    if (pathname !== "/auth/login") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  // Parse the user data
  const user = JSON.parse(decodeURIComponent(userCookie));

  // Role-based redirects
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${user.role}`, request.url));
  }

  if (pathname === "/admin") {
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
