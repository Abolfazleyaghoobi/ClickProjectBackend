import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Course } from "./courses.entity";
import { Link } from "./Interface/link.entity";
import { Image } from "./Interface/image.entity";
import { Research } from "./Interface/research.entity";
import { Conference } from "./Interface/conference.entity";

enum isPublished {
  yes = "yes",
  no = "no",
}

@Entity("steps")
export class steps {
  @PrimaryGeneratedColumn()
  id!: number;
  // main table
  @Column({
    type: "varchar",
    length: 60,
  })
  step_title!: string;

  @Column({
    type: "text",
  })
  step_description!: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: true,
  })
  project_description!: string | null;
  @Column({
    type: "varchar",
    length: 150,
    nullable: true,
  })
  rules_description!: string | null;

  @Column({
    type: "enum",
    enum: isPublished,
    default: isPublished.no,
  })
  is_published!: isPublished;

  // Step
  @ManyToOne(() => Course, (course) => course.steps, {
    onDelete: "CASCADE",
  })
  course!: Course;

  @OneToMany(() => Link, (link) => link.step, {
    onDelete: "CASCADE",
  })
  links!: Link[];

  @OneToMany(() => Image, (link) => link.step, {
    onDelete: "CASCADE",
  })
  image!: Image[];

  @OneToMany(() => Research, (link) => link.step, {
    onDelete: "CASCADE",
  })
  Research!: Research[];

  @OneToMany(() => Conference, (link) => link.step, {
    onDelete: "CASCADE",
  })
  Conference!: Conference[];
  // main table
  @CreateDateColumn({
    type: "datetime",
    name: "created_at",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "datetime",
    name: "updated_at",
  })
  updated_at!: Date;

  @DeleteDateColumn({
    type: "datetime",
    name: "deleted_at",
    nullable: true,
  })
  deleted_at!: Date | null;
}
