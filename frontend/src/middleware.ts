import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

matcherUrls: [
  "/videocall/:path*",
  "/call/:path*",
  "/dashboard/:path*",
  "/dashboard",
];

export default function middleware(request: NextRequest) {
  const userCookie = request.cookies.get("accessToken");
  if (
    !userCookie &&
    (request.nextUrl.pathname.startsWith("/call") ||
      request.nextUrl.pathname.startsWith("/videocall") ||
      request.nextUrl.pathname.startsWith("/dashboard"))
  ) {

    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (userCookie && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}


