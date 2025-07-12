// lib/get-user-from-request.ts
import { verifyJwt } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

/**
 * Extracts the JWT token from the Authorization header and verifies it.
 * Returns the decoded user payload if valid, otherwise null.
 */
export async function getUserFromRequest(
  request: NextRequest
): Promise<{ userId: number; email: string } | null> {
  const token = request.cookies.get("token")?.value;

  if (!token) return null;

  return await verifyJwt<{ userId: number; email: string }>(token);
}
