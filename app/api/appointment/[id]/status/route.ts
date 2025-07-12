import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { Appointment } from "@/models/Appointment";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await initDB();
    const appointmentRepo = db.getRepository(Appointment);

    const appointment = await appointmentRepo.findOneBy({
      id: parseInt(params.id),
    });

    if (!appointment) {
      return NextResponse.json(
        { message: "appointment not found" },
        { status: 404 }
      );
    }
    const { status } = await request.json();
    if (!["booked", "completed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    appointment.status = status;
    await appointmentRepo.save(appointment);
  } catch (error) {
    console.log("server error", error);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
