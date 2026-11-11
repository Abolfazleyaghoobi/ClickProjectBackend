import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Index,
} from "typeorm";

import { User } from "./users.entity";

@Entity("user_profiles")
@Index("UQ_user_profiles_user_id", ["user_id"], {
  unique: true,
})
export class UserProfile {
  @PrimaryGeneratedColumn({
    type: "bigint",
    unsigned: true,
  })
  id!: string;

  @Column({
    type: "bigint",
    unsigned: true,
  })
  user_id!: string;

  @OneToOne(() => User, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "FK_user_profiles_user_id",
  })
  user!: User;

  @Column({
    type: "varchar",
    length: 60,
    nullable: true,
  })
  display_name!: string | null;

  @Column({
    type: "text",
    
    nullable: true,
  })
  bio!: string | null;

  @Column({
  type: "text",
   
    nullable: true
  })
  github_url!: string | null;
  @Column({
    type: "text",

    nullable: true
  })
  portolio_url!: string | null;

  @Column({
    type: "text",

    nullable: true,
  })
  avatar_url!: string | null;

  @Column({
    type: "text",
  
    nullable: true,
  })
  banner_url!: string | null;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
  })
  updated_at!: Date;
}
