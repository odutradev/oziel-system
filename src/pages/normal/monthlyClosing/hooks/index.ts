import { useCallback, useEffect, useState, useMemo } from "react";

import { getMonthlyClosingReport } from "@actions/machineOperations";

import type { MonthlyClosingData, MonthlyClosingHookProps, DetailTableRow, OperatorTableRow } from "../types";
import type { GetMonthlyClosingReportResponse } from "@actions/machineOperations/types";

const useMonthlyClosingHook = (): MonthlyClosingHookProps => {
    const [data, setData] = useState<MonthlyClosingData | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [loading, setLoading] = useState(false);

    const fetchReport = useCallback(async () => {
        setLoading(true);
        const params = { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1 };
        const response = await getMonthlyClosingReport(params);
        if (response && !("error" in response)) {
            const typedResponse = response as GetMonthlyClosingReportResponse;
            const operatorTotals: OperatorTableRow[] = typedResponse.operatorTotals.map((item, index) => ({ ...item, _id: `op-${index}` }));
            const details: DetailTableRow[] = typedResponse.details.map((item, index) => ({ ...item, _id: `det-${index}` }));
            setData({ ...typedResponse, operatorTotals, details });
        }
        setLoading(false);
    }, [selectedDate]);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const handleChangeMonth = useCallback((direction: "prev" | "next") => {
        setSelectedDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
            return newDate;
        });
    }, []);

    const handlePrint = useCallback(() => {
        window.print();
    }, []);

    return useMemo(() => ({
        data,
        loading,
        selectedDate,
        handlePrint,
        handleChangeMonth
    }), [data, loading, selectedDate, handlePrint, handleChangeMonth]);
};

export default useMonthlyClosingHook;