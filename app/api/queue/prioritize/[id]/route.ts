import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/init-db";
import { Queue } from "@/models/Queue";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const queueRepo = db.getRepository(Queue);

  try {
    const queue = await queueRepo.findOneBy({ id: parseInt(params.id) });
    if (!queue) {
      return NextResponse.json(
        { message: "Queue entry not found" },
        { status: 404 }
      );
    }

    const { priority, queue_number } = await request.json();
    if (typeof priority === "boolean") {
      queue.priority = priority;
    }
    if (queue_number !== undefined && typeof queue_number === "number") {
      queue.queue_number = queue_number;
    }

    await queueRepo.save(queue);

    return NextResponse.json(
      { message: "Queue entry prioritized", updated: queue },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
