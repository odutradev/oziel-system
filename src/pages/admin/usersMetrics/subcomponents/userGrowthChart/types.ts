import type { UserMetricsResponse } from '@actions/user/types';

export interface UserGrowthChartProps {
  data: UserMetricsResponse['timeline'] | undefined;
}