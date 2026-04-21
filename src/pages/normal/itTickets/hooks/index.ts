import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getTickets, deleteTicket, getTicketsDashboard } from "@actions/itTickets";
import useAction from "@hooks/useAction";

import type { DashboardMetricsResponse, TicketModelType } from "@actions/itTickets/types";
import type { TicketsHookProps } from "../types";

const useTicketsHook = (): TicketsHookProps => {
    const navigate = useNavigate();

    const [metrics, setMetrics] = useState<DashboardMetricsResponse | null>(null);
    const [tickets, setTickets] = useState<TicketModelType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);

        const [ticketsResponse, metricsResponse] = await Promise.all([
            getTickets({ limit: 1000 }),
            getTicketsDashboard()
        ]);

        if (ticketsResponse && !("error" in ticketsResponse)) setTickets(ticketsResponse.data);
        if (metricsResponse && !("error" in metricsResponse)) setMetrics(metricsResponse);

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreateNew = useCallback(() => {
        navigate("/dashboard/tickets/new");
    }, [navigate]);

    const handleEdit = useCallback((id: string) => {
        navigate(`/dashboard/tickets/edit/${id}`);
    }, [navigate]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteTicket(id),
            toastMessages: { success: "Chamado removido com sucesso", error: "Erro ao remover", pending: "Removendo..." },
            callback: fetchData
        });
    }, [fetchData]);

    return useMemo(() => ({
        handleCreateNew,
        handleDelete,
        handleEdit,
        loading,
        tickets,
        metrics
    }), [handleCreateNew, handleDelete, handleEdit, loading, tickets, metrics]);
};

export default useTicketsHook;