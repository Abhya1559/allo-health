import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Doctor } from "./Doctor";

@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  patientName!: string;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;

  @Column()
  time_slot!: Date;

  @Column()
  status!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}
