import { useState } from "react";

import usePagination from "@hooks/usePagination";
import { getUserLogs } from "@actions/logs";

import type { LogEntry } from "@actions/logs/types";

const useLogs = () => {
    const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, meta, loading, page, limit, setPage, setLimit } = usePagination<LogEntry>(
        async (currentPage, currentLimit) => {
            const result = await getUserLogs({ page: currentPage, limit: currentLimit });

            if ("error" in result) {
                return { data: [], meta: { total: 0, page: 1, pages: 0, limit: currentLimit } };
            }

            return {
                data: result.data,
                meta: result.meta
            };
        },
        { page: 1, limit: 15 }
    );

    const filteredData = searchTerm ? data.filter((log) => log.description?.toLowerCase().includes(searchTerm.toLowerCase()) || log.action?.toLowerCase().includes(searchTerm.toLowerCase()) || log.entity?.toLowerCase().includes(searchTerm.toLowerCase())) : data;

    return {
        logs: filteredData,
        setSelectedLog,
        setSearchTerm,
        selectedLog,
        setLimit,
        setPage,
        loading,
        limit,
        page,
        meta
    };
};

export default useLogs;