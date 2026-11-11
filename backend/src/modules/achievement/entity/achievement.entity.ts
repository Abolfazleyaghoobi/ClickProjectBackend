import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { UserAchievement } from '../../users/entities/UserAchievement.entity';


@Entity('achievement_definitions')
export class AchievementDefinition {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  @Index('idx_achievement_key')
  key!: string; 

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 50, name: 'icon_key' })
  iconKey!: string; 

  @Column({ type: 'varchar', length: 50, name: 'condition_type' })
  conditionType!: string; 

  @Column({ type: 'int', unsigned: true, name: 'condition_value' })
  conditionValue!: number; 

  @Column({ type: 'boolean', default: true, name: 'is_active' })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt!: Date;

  
  @OneToMany(
    () => UserAchievement,
    (userAchievement:any) => userAchievement.achievement,
  )
userAchievements!: UserAchievement[];
}