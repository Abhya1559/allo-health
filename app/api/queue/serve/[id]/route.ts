import { NextResponse, NextRequest } from "next/server";
import { initDB } from "@/lib/init-db";
import { Queue } from "@/models/Queue";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const queueRepo = db.getRepository(Queue);

  try {
    const queue = await queueRepo.findOneBy({ id: parseInt(params.id) });

    if (!queue) {
      return NextResponse.json(
        { message: "No queue entry found with this ID" },
        { status: 404 }
      );
    }

    queue.status = "completed";
    await queueRepo.save(queue);

    return NextResponse.json(
      { message: "Queue status updated to completed", queue },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const db = await initDB();
  const queueRepo = db.getRepository(Queue);

  try {
    const queue = await queueRepo.findOneBy({ id: parseInt(params.id) });

    if (!queue) {
      return NextResponse.json(
        { message: "No queue entry found with this ID" },
        { status: 404 }
      );
    }

    await queueRepo.remove(queue);

    return NextResponse.json(
      { message: "Patient removed from queue successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Server error while deleting patient from queue" },
      { status: 500 }
    );
  }
}
