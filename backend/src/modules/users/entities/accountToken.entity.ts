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

@Entity("user_tokens")
@Index("IDX_user_tokens_user_id", ["user_id"])
export class UserToken {

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

    @ManyToOne(() => User, {
        onDelete: "CASCADE",
    })
    @JoinColumn({
        name: "user_id",
        referencedColumnName: "id",
        foreignKeyConstraintName: "FK_user_tokens_user_id",
    })
    user!: User;

    @Column({
        type: "varchar",
        length: 255,
        select: false,
    })
    token_Raw!: string | null;

    @Column({
        type: "varchar",
        length: 16,
    })
    prefix!: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true,
    })
    label!: string | null;

    @Column({
        type: "datetime",
        nullable: true,
    })
    last_used_at!: Date | null;

    @Column({
        type: "datetime",
        nullable: true,
    })
    revoked_at!: Date | null;

    @CreateDateColumn({
        type: "datetime",
        name: "created_at",
    })
    created_at!: Date;

    @Column({
        type: "datetime",
        nullable: true,
    })
    expires_at!: Date | null;
}