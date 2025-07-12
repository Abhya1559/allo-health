import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { Doctor } from "@/models/Doctor";

export async function GET(request: NextRequest) {
  try {
    const db = await initDB();
    const doctors = await db.getRepository(Doctor).find(); // ← fixed

    return NextResponse.json(doctors, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  const db = await initDB();

  try {
    const data = await request.json();
    const { name, specialization, gender, location, available_time } = data;

    if (!name || !specialization || !gender || !location || !available_time) {
      return NextResponse.json(
        {
          error:
            "All fields (name, specialization, gender, location, available_time) are required",
        },
        { status: 400 }
      );
    }

    const doctorRepo = db.getRepository(Doctor);
    const newDoctor = doctorRepo.create({
      name,
      specialization,
      gender,
      location,
      available_time,
    });

    await doctorRepo.save(newDoctor);

    return NextResponse.json(
      { message: "Doctor added successfully", doctor: newDoctor },
      { status: 201 }
    );
  } catch (error) {
    console.error("sError adding doctor:", error);
    return NextResponse.json(
      { error: "Failed to add doctor" },
      { status: 500 }
    );
  }
}
