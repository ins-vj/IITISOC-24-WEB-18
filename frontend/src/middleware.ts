import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("accessToken");
  if (!userCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (request.nextUrl.pathname.startsWith("login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/videocall/:path*",
    "/call/:path*",
    "/dashboard/:path*",
    "/dashboard",
  ],
};
