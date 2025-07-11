import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const db = await initDB();
  try {
    const body = await request.json();
    console.log(body);
    const { name, email, password } = body;
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const userRepo = db.getRepository(User);
    const existingUser = await userRepo.findOneBy({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 409 }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepo.create({
      name,
      email,
      password: hashPassword,
    });
    await userRepo.save(newUser);
    return NextResponse.json(
      { message: "User Register successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("some error from server", error);
    return NextResponse.json(
      { error: "Server error while register" },
      { status: 500 }
    );
  }
}
