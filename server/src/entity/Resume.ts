import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Education } from "./Education";

@Entity()
export class Resume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  uuid: string;

  @Column()
  phoneNumber: string;

  @OneToMany(type => Education, education => education.resume)
  education: Education;
}
