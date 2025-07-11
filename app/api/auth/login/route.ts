import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import { signJwt } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "all fields are required" });
    }
    const db = await initDB();
    const userRepo = db.getRepository(User);
    const user = await userRepo.findOneBy({ email });

    if (!user) {
      return NextResponse.json({
        error: "user not exist in data please register ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "credential error" }, { status: 402 });
    }

    const token = signJwt({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
    });

    cookies().set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60, // 1 hour
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json(
      {
        message: "user logged in successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("server error while login", error);
    return NextResponse.json(
      { error: "Server error while login" },
      { status: 500 }
    );
  }
}
