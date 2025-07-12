import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/init-db";
import { Queue } from "@/models/Queue";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await initDB();
    const queueRepo = db.getRepository(Queue);

    const queue = await queueRepo.findOneBy({ id: parseInt(params.id) });
    if (!queue) {
      return NextResponse.json(
        { error: "Queue entry not found" },
        { status: 404 }
      );
    }

    const { status } = await request.json();
    if (!["waiting", "with doctor", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    queue.status = status;
    await queueRepo.save(queue);

    return NextResponse.json({ message: "Queue status updated", queue });
  } catch (error) {
    console.error("Error updating queue status", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
