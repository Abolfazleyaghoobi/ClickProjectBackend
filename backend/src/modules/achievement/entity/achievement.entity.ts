// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   CreateDateColumn,
//   OneToMany,
//   Index,
// } from 'typeorm';
// import { UserAchievement } from './UserAchievement';

// @Entity('achievement_definitions')
// export class AchievementDefinition {
//   @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
//   id!: string;

//   @Column({ type: 'varchar', length: 50, unique: true })
//   @Index('idx_achievement_key')
//   key!: string; // مثلاً: first_lesson

//   @Column({ type: 'varchar', length: 100 })
//   title!: string;

//   @Column({ type: 'text' })
//   description!: string;

//   @Column({ type: 'varchar', length: 50, name: 'icon_key' })
//   iconKey!: string; // مثلاً: academic_cap

//   @Column({ type: 'varchar', length: 50, name: 'condition_type' })
//   conditionType!: string; // مثلاً: step_completed_count

//   @Column({ type: 'int', unsigned: true, name: 'condition_value' })
//   conditionValue!: number; // مثلاً: 1

//   @Column({ type: 'boolean', default: true, name: 'is_active' })
//   isActive!: boolean;

//   @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
//   createdAt!: Date;

//   // رابطه یک به چند با جدول دستاوردهای کاربران
//   @OneToMany(
//     () => UserAchievement,
//     (userAchievement) => userAchievement.achievement,
//   )
// userAchievements!: UserAchievement[];
// }