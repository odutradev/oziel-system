import { useState } from "react";

import usePagination from "@hooks/usePagination";
import { getUserLogs } from "@actions/logs";

import type { LogEntry } from "@actions/logs/types";

const useLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, meta, loading, page, limit, setPage, setLimit } = usePagination<LogEntry>(
    async (currentPage, currentLimit) => {
      const result = await getUserLogs({ page: currentPage, limit: currentLimit });
      if ("error" in result) return result;
      return { data: result.logs, meta: result.meta };
    },
    { page: 1, limit: 15 }
  );

  const filteredData = searchTerm
    ? data.filter(
        (log) =>
          log.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.metadata?.ip?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  return {
    onSearch: setSearchTerm,
    logs: filteredData,
    setLimit,
    loading,
    setPage,
    limit,
    page,
    meta,
  };
};

export default useLogs;