import type { UserMetricsResponse } from '@actions/user/types';

export interface RetentionChartProps {
  data: UserMetricsResponse['retention'] | undefined;
}