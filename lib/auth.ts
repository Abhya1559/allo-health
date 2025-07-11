import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";

export async function GET() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const payload = verifyJwt(token);
  if (!payload)
    return Response.json({ error: "Invalid token" }, { status: 401 });

  return Response.json({ user: payload });
}
