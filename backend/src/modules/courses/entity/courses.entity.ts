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

import { PathList_course } from "../../courses_path/entity/pathList_course.entity";
import { steps } from "./step.entity";

enum isPublished {
  yes = "yes",
  no = "no",
}

@Entity("courses")
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;
  // main column

  @Column({
    type: "varchar",
    length: 60,
  })
  title!: string;

  @Column({
    type: "text",
  })
  description!: string;

  @Column({
    type: "varchar",
    length: 150,
    nullable: true,
  })
  image_ulr!: string | null;

  @Column({
    type: "enum",
    enum: isPublished,
    default: isPublished.no,
  })
  is_published!: isPublished;

  @OneToMany(() => PathList_course, (pathListCourse) => pathListCourse.course, {
    onDelete: "CASCADE",
  })
  pathList_course!: PathList_course[];



// Course
@OneToMany(() => steps, (step) => step.course)
steps!: steps[];



  // main column
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
