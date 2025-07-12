// lib/jwt.ts
import { SignJWT, jwtVerify, JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET!;
const secret = new TextEncoder().encode(JWT_SECRET);

/** Sign a JWT (Edge Compatible) */
export async function signJwt(
  payload: JWTPayload,
  expiresIn = "1h"
): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secret);
}

/** Verify a JWT (Edge Compatible) */
export async function verifyJwt<T = JWTPayload>(
  token: string
): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
  } catch (err) {
    console.warn("Invalid JWT:", err);
    return null;
  }
}
