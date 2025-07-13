import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("doctors")
export class Doctor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  specialization!: string;

  @Column()
  gender!: string;

  @Column()
  location!: string;

  @Column("text")
  available_time!: string;
}
