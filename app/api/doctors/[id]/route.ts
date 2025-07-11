import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { Doctor } from "@/models/Doctor";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const doctorRepo = db.getRepository(Doctor);

  const data = await request.json();

  await doctorRepo.update(params.id, data);
  return NextResponse.json({ message: "doctor updated" });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const doctorRepo = db.getRepository(Doctor);

  await doctorRepo.delete(params.id);
  return NextResponse.json({ message: "Doctor deleted" });
}
