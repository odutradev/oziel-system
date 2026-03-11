import { useState, useEffect } from 'react';

import usePagination from '@hooks/usePagination';
import { getAllLogs, getLogStats } from '@actions/logs';

import type { LogEntry, LogStatsResponse } from '@actions/logs/types';

const useLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [stats, setStats] = useState<LogStatsResponse | null>(null);

  const { data, meta, loading, page, limit, setPage, setLimit } = usePagination<LogEntry>(
    async (currentPage, currentLimit) => {
      const result = await getAllLogs({
        page: currentPage,
        limit: currentLimit,
      });

      if ('error' in result) {
        return { data: [], meta: { total: 0, page: 1, pages: 0, limit: currentLimit } };
      }

      return {
        data: result.logs,
        meta: result.meta,
      };
    },
    { page: 1, limit: 15 }
  );

  useEffect(() => {
    const fetchStats = async () => {
      const result = await getLogStats({});
      if (!('error' in result)) setStats(result);
    };
    fetchStats();
  }, []);

  const filteredData = searchTerm
    ? data.filter(
        (log) =>
          log.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.entity?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  return {
    logs: filteredData,
    meta,
    loading,
    page,
    limit,
    stats,
    selectedLog,
    setPage,
    setLimit,
    setSearchTerm,
    setSelectedLog,
  };
};

export default useLogs;