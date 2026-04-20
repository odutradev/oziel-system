import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { getTickets, deleteTicket } from "@actions/itTickets";
import useAction from "@hooks/useAction";

import type { TicketModelType } from "@actions/itTickets/types";
import type { TicketsHookProps } from "../types";

const useTicketsHook = (): TicketsHookProps => {
    const navigate = useNavigate();

    const [tickets, setTickets] = useState<TicketModelType[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTickets = useCallback(async () => {
        setLoading(true);
        const response = await getTickets({ limit: 1000 });
        if (response && !("error" in response)) setTickets(response.data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

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
            callback: fetchTickets
        });
    }, [fetchTickets]);

    return useMemo(() => ({
        handleCreateNew,
        handleDelete,
        handleEdit,
        loading,
        tickets
    }), [handleCreateNew, handleDelete, handleEdit, loading, tickets]);
};

export default useTicketsHook;