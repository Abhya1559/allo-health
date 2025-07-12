import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.warn("No JWT found");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const verified = verifyJwt(token);
  if (!verified) {
    console.warn("Invalid JWT");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const response = NextResponse.next();
  response.headers.set("x-user", JSON.stringify(verified));

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/private/:path*"],
};
