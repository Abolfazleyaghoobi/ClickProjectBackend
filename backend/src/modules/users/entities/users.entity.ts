import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from "typeorm";
import { OneToOne } from "typeorm";
import { UserProfile } from "./userProfile.entity";
import { UserToken } from "./accountToken.entity";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
}

@Entity("users")
@Index("UQ_users_phone", ["phone"], {
  unique: true,
})



export class User {
  @PrimaryGeneratedColumn({
    type: "bigint",
    unsigned: true,
  })
  id!: string;

  @Column({
    type: "varchar",
    length: 24,
  })
  username!: string;

  @Column({
    type: "varchar",
    length: 11,
  })
  phone!: string;

  @Column({
    type: "varchar",
    length: 255,
    select: false,
  })
  password_hash!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role!: UserRole;

  @Column({
    type: "enum",
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({ type: "int", unsigned: true, default: 1 })
  level!: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  xp!: number;

  @Column({ type: "int", unsigned: true, default: 1000 })
  xp_to_next_level!: number;

  @Column({ type: "int", unsigned: true, default: 0 })
  step_balance!: number;


  @OneToOne(() => UserProfile, (profile:UserProfile) => profile.user)
  profile!: UserProfile;
   @OneToOne(() => UserToken, (profile:UserToken) => profile.user)
  AccountToken!: UserToken;

  @Column({
    type: "datetime",
    nullable: true,
  })
  phone_verified_at!: Date | null;


  
  @Column({
    type: "datetime",
    nullable: true,
  })
  last_active_at!: Date | null;

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
