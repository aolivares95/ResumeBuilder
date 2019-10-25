import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  educationIds: string;
}
