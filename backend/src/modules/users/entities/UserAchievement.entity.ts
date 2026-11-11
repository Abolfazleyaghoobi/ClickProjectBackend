import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';


import { User } from './users.entity';
import { AchievementDefinition } from '../../achievement/entity/achievement.entity';

@Entity('user_achievements')
export class UserAchievement {
  // بخش اول کلید اصلی مرکب
  @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'user_id' })
  @Index('idx_user_achievements_user_id')
  userId!: string;

  // بخش دوم کلید اصلی مرکب
  @PrimaryColumn({ type: 'bigint', unsigned: true, name: 'achievement_id' })
  @Index('idx_user_achievements_achievement_id')
  achievementId!: string;

  @CreateDateColumn({ type: 'timestamp', name: 'unlocked_at' })
  unlockedAt!: Date;

  // رابطه با جدول کاربران
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  // رابطه با جدول تعریف دستاوردها
  @ManyToOne(() => AchievementDefinition, (def) => def.userAchievements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'achievement_id' })
  achievement!: AchievementDefinition;
}