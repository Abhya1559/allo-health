import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Doctor } from "./Doctor";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  patient_name!: string;

  @ManyToOne(() => Doctor)
  @JoinColumn({ name: "doctor_id" })
  doctor!: Doctor;

  @Column()
  time_slot!: Date;

  @Column()
  status!: string; // booked | completed | cancelled

  @CreateDateColumn()
  created_at!: Date;
}
