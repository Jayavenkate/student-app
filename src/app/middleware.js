// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // No token, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const { role } = payload;

    const { pathname } = req.nextUrl;

    // Protect admin routes
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }

    // Protect user routes
    if (pathname.startsWith("/user") && role !== "user") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // If everything is fine, continue
    return NextResponse.next();
  } catch (error) {
    // console.error("JWT Verify Error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Only run middleware on these routes
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
