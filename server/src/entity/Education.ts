import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  degree: string;

  @Column()
  resumeId: number;
}
