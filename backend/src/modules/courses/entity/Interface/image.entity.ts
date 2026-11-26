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





@Entity("Image")
export class Image {
  @PrimaryGeneratedColumn()
  id!: number;
// main table
 
  @Column({
    type: "text",
  })
  url!: string;

  @ManyToOne(()=>steps,(stets)=>stets.image,{
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
