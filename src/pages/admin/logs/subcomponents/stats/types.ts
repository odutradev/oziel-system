import type { LogStatsResponse } from '@actions/logs/types';

export interface StatsCardsProps {
  stats: LogStatsResponse | null;
  loading?: boolean;
}