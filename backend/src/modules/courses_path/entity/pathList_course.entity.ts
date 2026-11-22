
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

import { Path_List } from "./path_list.entity";
import { Course } from "../../courses/entity/courses.entity";

@Entity("PathList_course")
@Index(["path_list_id", "coursesId"], { unique: true })
export class PathList_course {
  @PrimaryGeneratedColumn()
  id!: number;

  // ارتباط با بخش مسیر آموزشی
  @ManyToOne(
    () => Path_List,
    (pathList) => pathList.courses,
  )
  @JoinColumn({ name: "path_list_id" })
  pathList!: Path_List;

  @Column({ type: "int" })
  path_list_id!: number;

  // ارتباط با دوره
  @ManyToOne(
    () => Course,
    (course) => course.pathList_course,
  )
  @JoinColumn({ name: "coursesId" })
  course!: Course;

  @Column({ type: "int" })
  coursesId!: number;

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
