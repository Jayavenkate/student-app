// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Middleware only runs on server, so cookies from headers must be used
export async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const username = req.cookies.get("username")?.value;
  if (!token || !username) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const userRole = payload.role;

    const { pathname } = req.nextUrl;

    // Block users from accessing admin routes
    if (pathname.startsWith("/admin") && userRole !== "admin") {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    // Block admins from accessing user routes
    if (pathname.startsWith("/user") && userRole !== "user") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // Allow access
    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
