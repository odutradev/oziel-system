import type { UserMetricsResponse } from '@actions/user/types';

export interface StatusDistributionChartProps {
  data: UserMetricsResponse['status'] | undefined;
}