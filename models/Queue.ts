import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Queue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  patient_name!: string;

  @Column()
  queue_number!: number;

  @Column()
  status!: string; // waiting | with doctor | completed

  @CreateDateColumn()
  created_at!: Date;
}
