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
  ADMIN = "admin",
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
      type:"varchar",
      length:5,
      default:AdminRole.ADMIN
  })
  role!:string;

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
