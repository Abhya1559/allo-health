import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  //   (await cookies()).set("token", "", {
  //     maxAge: 0,
  //     path: "/",
  //   });
  (await cookies()).delete("token");

  return NextResponse.json({ message: "Logged out" });
}
