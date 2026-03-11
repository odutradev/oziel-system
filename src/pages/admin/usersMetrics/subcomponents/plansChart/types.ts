import type { UserMetricsResponse } from '@actions/user/types';

export interface PlansChartProps {
  data: UserMetricsResponse['plans'] | undefined;
}