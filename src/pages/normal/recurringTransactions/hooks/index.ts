import { useState, useEffect, useCallback, useMemo } from "react";

import { getRecurringTransactions, createRecurringTransaction, updateRecurringTransaction, deleteRecurringTransaction } from "@actions/recurringTransactions";
import { formatInputDate } from "@utils/formatters";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { RecurringTransactionModelType } from "@utils/types/models/recurringTransaction";
import type { RecurringHookProps, RecurringFormData } from "../types";

const INITIAL_FORM_DATA: RecurringFormData = { title: "", amount: 0, type: "EXPENSE", frequency: "MONTHLY", nextExecution: formatInputDate(new Date()), active: true, description: "", category: "" };

const useRecurringHook = (): RecurringHookProps => {
    const [formData, setFormData] = useState<RecurringFormData>(INITIAL_FORM_DATA);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchTransactions = useCallback(async (page: number, limit: number) => {
        return await getRecurringTransactions({ page, limit });
    }, []);

    const { data: transactions, meta, loading, refresh, setPage, setLimit } = usePagination<RecurringTransactionModelType>(fetchTransactions);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleOpenModal = useCallback((transaction?: RecurringTransactionModelType) => {
        if (transaction) {
            setFormData({ _id: transaction._id, title: transaction.title, amount: transaction.amount, type: transaction.type, frequency: transaction.frequency, nextExecution: formatInputDate(transaction.nextExecution), active: transaction.active, category: transaction.category ?? "", description: transaction.description ?? "", dayOfMonth: transaction.dayOfMonth, intervalDays: transaction.intervalDays });
        } else {
            setFormData(INITIAL_FORM_DATA);
        }
        setModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        setFormData(INITIAL_FORM_DATA);
    }, []);

    const handleFormChange = useCallback((field: keyof RecurringFormData, value: string | number | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        if (!formData.title || formData.amount <= 0 || !formData.nextExecution) return;
        await useAction({
            action: async () => formData._id ? await updateRecurringTransaction(formData._id, formData) : await createRecurringTransaction(formData),
            toastMessages: { success: "Agendamento salvo com sucesso", error: "Erro ao salvar agendamento", pending: "Salvando..." },
            callback: () => {
                refresh();
                handleCloseModal();
            }
        });
    }, [formData, refresh, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteRecurringTransaction(id),
            toastMessages: { success: "Agendamento removido", error: "Erro ao remover agendamento", pending: "Removendo..." },
            callback: refresh
        });
    }, [refresh]);

    return useMemo(() => ({ meta, loading, formData, modalOpen, transactions, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange }), [meta, loading, formData, modalOpen, transactions, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange]);
};

export default useRecurringHook;