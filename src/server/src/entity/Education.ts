import { Resume } from "./Resume";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId
} from "typeorm";

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  degree: string;

  @Column()
  uuid: string;

  @ManyToOne(type => Resume, resume => resume.education)
  resume: Resume;
}
