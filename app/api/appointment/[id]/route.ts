import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { Appointment } from "@/models/Appointment";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await initDB();
    const appointment = db.getRepository(Appointment);

    const getAppointment = await appointment.findOneBy({
      id: parseInt(params.id),
    });

    if (!getAppointment) {
      return NextResponse.json(
        { message: "Appointment not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(getAppointment, { status: 200 });
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json(
      {
        message: "Server error while getting all Appointment",
      },
      { status: 501 }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const appointmentRepo = db.getRepository(Appointment);

  try {
    const appointment = await appointmentRepo.findOneBy({
      id: parseInt(params.id),
    });
    if (!appointment) {
      return NextResponse.json(
        { message: "No appointment found" },
        { status: 404 }
      );
    }
    const data = await request.json();
    await appointmentRepo.update(params.id, data);
    return NextResponse.json(
      { message: "appointment updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("server error", error);
    return NextResponse.json(
      {
        error: "server error while updating appointment",
      },
      { status: 501 }
    );
  }
}
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const appointmentRepo = db.getRepository(Appointment);

  try {
    const appointment = await appointmentRepo.findOneBy({
      id: parseInt(params.id),
    });
    if (!appointment) {
      return NextResponse.json({ message: "No appointment" }, { status: 404 });
    }
    await appointmentRepo.remove(appointment);
    return NextResponse.json(
      { message: "appointment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("server error", error);
    return NextResponse.json({ message: "server error" }, { status: 501 });
  }
}
