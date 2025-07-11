import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "@/models/User";
import "reflect-metadata";
import { Doctor } from "@/models/Doctor";
import { Appointment } from "@/models/Appointment";
import { Queue } from "@/models/Queue";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Doctor, Appointment, Queue],
});
