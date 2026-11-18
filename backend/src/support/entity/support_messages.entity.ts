import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { SupportConversation } from "./support_conversations.entity";
import { AdminRole } from "../../modules/admin/entity/admin.entity";


@Entity("support_messages")
@Index("idx_messages_conversation_id", ["conversationId"])
@Index("idx_messages_created_at", ["createdAt"])
@Index("idx_messages_conversation_created", ["conversationId", "createdAt"])
export class SupportMessage {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id!: string; // برای سازگاری با فرانت‌اند به صورت string تعریف شده است

  @Column({ name: "conversation_id", type: "bigint" })
  conversationId!: string;

  @Column({
    name: "sender_type",
    type: "enum",
    enum:  AdminRole
  })
  senderType!:AdminRole; // نوع فرستنده مطابق مستند (user یا support)

  @Column({ name: "sender_id", type: "bigint" })
  senderId!: string;

  @Column({ type: "text" })
  text!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  // ایجاد رابطه Many-to-One با جدول گفتگوها
  @ManyToOne(
    () => SupportConversation,
    (conversation) => conversation.messages,
    { onDelete: "CASCADE" }
  )
  @JoinColumn({ name: "conversation_id" })
  conversation!: SupportConversation;
}