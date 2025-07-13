import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("queues")
export class Queue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  patient_name!: string;

  @Column()
  queue_number!: number;

  @Column()
  status!: string;

  @Column({ default: false })
  priority!: boolean;

  @CreateDateColumn()
  created_at!: Date;
}
