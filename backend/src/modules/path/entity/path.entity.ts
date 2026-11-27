import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
  OneToOne,
} from "typeorm";
// import {  Path_List } from "../../courses_path/entity/path_list.entity";
import { PathList_course } from "../../courses_path/entity/pathList_course.entity";
export enum isPublished {
  yes = "yes",
  no = "no",
}
@Entity("paths")
export class Path {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 100,
  })
  @Index({ unique: true })
  key!: string;
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
  image_ulr!: string;

  @Column({
    type: "enum",
    enum: isPublished,
    default: isPublished.no,
  })
  is_published!: isPublished;
  


@OneToMany(
  () => PathList_course,
  (pathListCourse) => pathListCourse.path
)
pathList_course!: PathList_course[];
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
