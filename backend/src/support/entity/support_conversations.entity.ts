import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany
} from "typeorm";
import { SupportMessage } from "./support_messages.entity";


@Entity("support_conversations")
@Index("idx_conversations_user_id", ["userId"], { unique: true })
@Index("idx_conversations_last_message_at", ["lastMessageAt"])
export class SupportConversation {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: string; // برای سازگاری شناسه با فرانت‌اند به صورت string تعریف شده است

  @Column({ name: "user_id", type: "bigint", unique: true })
  userId!: string;

  @Column({ name: "last_message_id", type: "bigint", nullable: true })
  lastMessageId!: string;

  @Column({ name: "last_message_at", type: "datetime", nullable: true })
  lastMessageAt!: Date;

  @Column({ name: "user_last_read_at", type: "datetime", nullable: true })
  userLastReadAt!: Date;

  @Column({ name: "support_last_read_at", type: "datetime", nullable: true })
  supportLastReadAt!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // ارتباط با جدول پیام‌ها (در صورت نیاز به Relation)
  @OneToMany(() => SupportMessage, (message) => message.conversation)
  messages!: SupportMessage[];
}