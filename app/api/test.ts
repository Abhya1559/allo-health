import type { NextApiRequest, NextApiResponse } from "next";
import { initDB } from "../../lib/init-db";
import { Doctor } from "../../models/Doctor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await initDB();
    const doctorRepo = db.getRepository(Doctor);

    const doctors = await doctorRepo.find();
    return res.status(200).json(doctors);
  } catch (error) {
    console.error(" Database error:", error);
    return res.status(500).json({ message: "Database error" });
  }
}
