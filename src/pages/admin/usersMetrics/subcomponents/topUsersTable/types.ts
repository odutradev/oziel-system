import type { UserMetricsResponse } from '@actions/user/types';

export interface TopUsersTableProps {
  data: UserMetricsResponse['topUsers']['bySpending'] | undefined;
}