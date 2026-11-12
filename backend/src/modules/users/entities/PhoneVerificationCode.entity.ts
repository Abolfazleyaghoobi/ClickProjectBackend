import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";
import { User } from "./users.entity";



@Entity("phone_verification_codes")
@Index("IDX_phone_otp_user_id", ["user_id"])
export class PhoneVerificationCode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "bigint",
    unsigned: true,
  })
  user_id!: string;

  @Column({
    type: "varchar",
    length: 255,
  })
  code!: string;

  @Column({ type: "datetime" })
  expires_at!: Date;

  @Column({ type: "int", default: 0 })
  attempts!: number;

  @Column({ type: "datetime", nullable: true })
  consumed_at!: Date | null;

  @CreateDateColumn()
  created_at!: Date;

  @ManyToOne(
    () => User,
    (user) => user.phone_verification_codes,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "user_id" })
  user!: User;
}