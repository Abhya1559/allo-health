import { verifyJwt } from "@/lib/jwt";

export function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get("authorized");

  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];
  return verifyJwt<{ userId: number; email: string }>(token);
}
