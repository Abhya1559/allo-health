import { getUserFromRequest } from "@/lib/get-user-from-request";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUserFromRequest(request);
  console.log(user);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
