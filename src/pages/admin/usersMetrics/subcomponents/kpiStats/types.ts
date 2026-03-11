import type { UserMetricsResponse } from '@actions/user/types';

export interface KpiStatsProps {
  data: UserMetricsResponse | null;
}