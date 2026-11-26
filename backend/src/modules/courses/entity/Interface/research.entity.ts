import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
 
} from "typeorm";
import { steps } from "../step.entity";





@Entity("Research")
export class Research {
  @PrimaryGeneratedColumn()
  id!: number;
// main table
 
  @Column({
    type: "text",
  })
  title!: string;

  @ManyToOne(()=>steps,(stets)=>stets.Research,{
    onDelete: "CASCADE",
  })
  step!:steps
// main table
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
