// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const user = token ? await verifyJwt(token) : null;

  const { pathname } = request.nextUrl;
  const isAuthRoute = ["/login", "/register"].includes(pathname);
  const isPublicRoute = ["/", "/login", "/register"].includes(pathname);

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon\\.ico|api/).*)"],
};
