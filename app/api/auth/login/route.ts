import { initDB } from "@/lib/init-db";
import { signJwt } from "@/lib/jwt";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const db = await initDB();
    const userRepo = db.getRepository(User);
    const user = await userRepo.findOneBy({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist. Please register." },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = await signJwt({
      userId: user.id,
      userEmail: user.email,
      userName: user.name,
    });

    const response = NextResponse.json(
      {
        message: "User logged in successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Server error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
