import { useState, useCallback, useEffect } from "react";

import { getContractsDashboard } from "@actions/contracts";

import type { DashboardMetricsResponse } from "@actions/contracts/types";
import type { ContractsDashboardHookProps } from "../types";
import type { ChangeEvent, MouseEvent } from "react";

const formatDateForInput = (date: Date): string => {
    return date.toISOString().split("T")[0];
};

const calculateStartDate = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return formatDateForInput(date);
};

const useContractsDashboard = (): ContractsDashboardHookProps => {
    const [data, setData] = useState<DashboardMetricsResponse | null>(null);
    const [period, setPeriod] = useState<string>("30");
    const [endDate, setEndDate] = useState<string>(formatDateForInput(new Date()));
    const [startDate, setStartDate] = useState<string>(calculateStartDate(30));
    const [loading, setLoading] = useState<boolean>(true);

    const fetchDashboardData = useCallback(async () => {
        setLoading(true);
        const response = await getContractsDashboard({ startDate, endDate });
        if (!("error" in response)) setData(response);
        setLoading(false);
    }, [startDate, endDate]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const handleDateChange = useCallback((prop: "startDate" | "endDate") => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (prop === "startDate") setStartDate(value);
        if (prop === "endDate") setEndDate(value);
        setPeriod("custom");
    }, []);

    const handlePeriodChange = useCallback((_: MouseEvent<HTMLElement>, newPeriod: string | null) => {
        if (!newPeriod) return;
        setPeriod(newPeriod);
        if (newPeriod !== "custom") {
            setEndDate(formatDateForInput(new Date()));
            setStartDate(calculateStartDate(Number(newPeriod)));
        }
    }, []);

    return {
        data,
        period,
        loading,
        endDate,
        startDate,
        handleDateChange,
        handlePeriodChange
    };
};

export default useContractsDashboard;