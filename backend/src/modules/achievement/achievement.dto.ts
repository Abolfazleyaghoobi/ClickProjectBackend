
export interface CreateAchievementDto {
  key: string;
  title: string;
  description: string;
  iconKey: string;
  conditionType: string;
  conditionValue: number;
  isActive?: boolean;
}

export interface UpadateAchievementDto {
  key?: string;
  title?: string;
  description?: string;
  iconKey?: string;
  conditionType?: string;
  conditionValue?: number;
  isActive?: boolean;
}
