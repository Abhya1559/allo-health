import { initDB } from "@/lib/init-db";
import { Queue } from "@/models/Queue";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = await initDB();

  try {
    const queueRepo = db.getRepository(Queue);
    const queues = await queueRepo.find();
    return NextResponse.json(queues, { status: 200 });
  } catch (error) {
    console.error("server error ", error);
    return NextResponse.json({ message: "server error " }, { status: 500 });
  }
}
// POST /api/queue/add - Add walk-in patient to queue

export async function POST(request: NextRequest) {
  const db = await initDB();
  const body = await request.json();
  const { patient_name, queue_number } = body;

  if (!patient_name || !queue_number) {
    return NextResponse.json(
      { error: "name and qnumber is missing" },
      { status: 404 }
    );
  }

  try {
    const queueRepo = db.getRepository(Queue);
    if (!queueRepo) {
      return NextResponse.json(
        { error: "Queue not available" },
        { status: 404 }
      );
    }
    const newQueue = queueRepo.create({
      patient_name,
      queue_number,
      status: "waiting",
    });
    await queueRepo.save(newQueue);
    return NextResponse.json(
      { message: "Patient added in queue", queue: newQueue },
      { status: 201 }
    );
  } catch (error) {
    console.error("server error", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
