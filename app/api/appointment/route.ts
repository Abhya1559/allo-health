import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { Appointment } from "@/models/Appointment";
import { Doctor } from "@/models/Doctor";

export async function GET(request: NextRequest) {
  try {
    const db = await initDB();
    const appointmentRepo = db.getRepository(Appointment);

    const allAppointments = await appointmentRepo.find({
      relations: ["doctor"],
      order: { time_slot: "ASC" },
    });

    return NextResponse.json(allAppointments, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const db = await initDB();
  const data = await request.json();

  const { patientName, doctorId, time_slot, status } = data;

  if (!patientName || !doctorId || !time_slot) {
    return NextResponse.json(
      { error: "patientName, doctorId, and time_slot are required" },
      { status: 400 }
    );
  }

  try {
    const doctorRepo = db.getRepository(Doctor);
    const appointmentRepo = db.getRepository(Appointment);

    const doctor = await doctorRepo.findOneBy({ id: doctorId });
    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const newAppointment = appointmentRepo.create({
      patientName,
      doctor,
      time_slot: new Date(time_slot),
      status: status || "booked",
    });
    await appointmentRepo.save(newAppointment);
    return NextResponse.json(
      {
        message: "Appointment booked successfully",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("server error while appointment", error);
    return NextResponse.json(
      {
        message: "Server Error",
      },
      { status: 501 }
    );
  }
}
