import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { Doctor } from "@/models/Doctor";

export async function GET(request: NextRequest) {
  const db = await initDB();
  const doctors = db.getRepository(Doctor).find();
  //   const doctorList = await doctors.find();
  return NextResponse.json(doctors);
}

export async function POST(request: NextRequest) {
  const db = await initDB();
  const data = await request.json();

  const doctorRepo = db.getRepository(Doctor);

  const newDoctor = doctorRepo.create(data);
  await doctorRepo.save(newDoctor);

  return NextResponse.json({ message: "Doctor added", doctor: newDoctor });
}
