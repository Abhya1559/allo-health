import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "@/models/User";
import "reflect-metadata";
import { Doctor } from "@/models/Doctor";
import { Appointment } from "@/models/Appointment";
import { Queue } from "@/models/Queue";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User, Doctor, Appointment, Queue],
  extra: {
    connectTimeout: 10000,
  },
});
