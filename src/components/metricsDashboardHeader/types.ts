import type { ChangeEvent, MouseEvent } from 'react';

export interface MetricsDashboardHeaderProps {
  title: string;
  subtitle: string;
  period: string;
  startDate: string;
  endDate: string;
  onDateChange: (prop: 'startDate' | 'endDate') => (event: ChangeEvent<HTMLInputElement>) => void;
  onPeriodChange: (event: MouseEvent<HTMLElement>, newPeriod: string | null) => void;
}