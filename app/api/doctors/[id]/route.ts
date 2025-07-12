import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { Doctor } from "@/models/Doctor";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const doctorRepo = db.getRepository(Doctor);

  try {
    const doctor = await doctorRepo.findOneBy({ id: parseInt(params.id) });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    const data = await request.json();

    await doctorRepo.update(params.id, data);
    return NextResponse.json({ message: "Doctor updated successfully" });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const doctorRepo = db.getRepository(Doctor);

  try {
    const doctor = await doctorRepo.findOneBy({ id: parseInt(params.id) });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    await doctorRepo.remove(doctor);
    return NextResponse.json(
      { message: "Doctor deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return NextResponse.json(
      { error: "Failed to delete doctor" },
      { status: 500 }
    );
  }
}
