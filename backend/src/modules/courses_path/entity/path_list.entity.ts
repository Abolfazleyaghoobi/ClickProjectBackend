
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Path } from "../../path/entity/path.entity";
import { PathList_course } from "./pathList_course.entity";

@Entity("Path_List")
export class Path_List {
  @PrimaryGeneratedColumn()
  id!: number;

  // هر بخش متعلق به یک مسیر است
  @ManyToOne(() => Path, (path) => path.Path_List)
  @JoinColumn({ name: "pathId" })
  path!: Path;

  @Column({ type: "int" })
  pathId!: number;

  // هر بخش می‌تواند چندین ارتباط با دوره‌ها داشته باشد
  @OneToMany(
    () => PathList_course,
    (pathListCourse) => pathListCourse.pathList,
  )
  courses!: PathList_course[];

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
