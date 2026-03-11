import type { UserModelType } from '@utils/types/models/user';

export interface DashboardStatsProps {
  user: Partial<UserModelType> | null;
  totalProves: number;
}