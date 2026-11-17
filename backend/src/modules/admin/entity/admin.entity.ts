import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
  OneToMany,
} from "typeorm";

export enum AdminRole {
  MENTOR_MANAGER = "mentor_manager",
  SENIOR_MENTOR = "senior_mentor",
  FIRST_CLASS_MENTOR = "first_class_mentor",
  SECOND_CLASS_MENTOR = "second_class_mentor",
  THIRD_CLASS_MENTOR = "third_class_mentor",
  TRAINEE_MENTOR = "trainee_mentor",
}

@Entity("admins")
@Index("UQ_admins_id", ["username"], {
  unique: true,
})
export class Admins {
  @PrimaryGeneratedColumn({
    type: "bigint",
    unsigned: true,
  })
  id!: string;

  @Column({
    type: "varchar",
    length: 24,
    unique:true
  })
  username!: string;
  
  @Column({
      type:"varchar",
      length:60,
      unique:true
  })
  email!: string;

  @Column({
      type:"enum",
    enum: AdminRole,
    default: AdminRole.TRAINEE_MENTOR
  })
  role!:AdminRole;

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
