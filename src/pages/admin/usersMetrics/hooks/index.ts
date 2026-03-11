import { useState, useEffect, useCallback } from 'react';

import { getUserMetrics } from '@actions/user';

import type { UserMetricsResponse } from '@actions/user/types';
import type { ChangeEvent, MouseEvent } from 'react';

const DEFAULT_PERIOD = '90';

const calculateDateRange = (daysStr: string) => {
  const days = parseInt(daysStr, 10);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

export const useUserMetrics = () => {
  const [period, setPeriod] = useState<string>(DEFAULT_PERIOD);
  const [metrics, setMetrics] = useState<UserMetricsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState(() => calculateDateRange(DEFAULT_PERIOD));

  const fetchMetrics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getUserMetrics(dateRange);
      if ('error' in result) {
        setError((result as { error: string }).error);
        setMetrics(null);
      } else {
        setMetrics(result as UserMetricsResponse);
      }
    } catch {
      setError('Falha ao carregar métricas.');
      setMetrics(null);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const handleDateChange = (prop: 'startDate' | 'endDate') => (event: ChangeEvent<HTMLInputElement>) => {
    setDateRange(prev => ({ ...prev, [prop]: event.target.value }));
  };

  const handlePeriodChange = (_event: MouseEvent<HTMLElement>, newPeriod: string | null) => {
    if (!newPeriod) return;
    setPeriod(newPeriod);

    if (newPeriod !== 'custom') {
      setDateRange(calculateDateRange(newPeriod));
    }
  };

  return {
    metrics,
    loading,
    error,
    period,
    dateRange,
    handleDateChange,
    handlePeriodChange,
    refetch: fetchMetrics
  };
};