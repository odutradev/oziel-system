import { useState, useEffect, useCallback, useMemo } from "react";

import { getTreasuryDashboard, createTransaction, updateTransaction, confirmTransaction, deleteTransaction } from "@actions/treasury";
import { formatInputDate } from "@utils/formatters";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { TransactionModelType } from "@utils/types/models/transaction";
import type { TreasuryHookProps, TransactionFormData } from "../types";
import type { PaginationMeta } from "@utils/types/action";

const INITIAL_FORM_DATA: TransactionFormData = {
    title: "",
    amount: 0,
    type: "EXPENSE",
    date: formatInputDate(new Date()),
    status: "PENDING",
    category: "",
    description: ""
};

const useTreasuryHook = (): TreasuryHookProps => {
    const [formData, setFormData] = useState<TransactionFormData>(INITIAL_FORM_DATA);
    const [currentBalance, setCurrentBalance] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [modalOpen, setModalOpen] = useState(false);

    const fetchDashboard = useCallback(async (page: number, limit: number) => {
        const params = { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, page, limit };
        const response = await getTreasuryDashboard(params);
        if (response && !("error" in response)) {
            setCurrentBalance(response.currentBalance);
            const defaultMeta: PaginationMeta = { limit, page, pages: 1, total: response.transactions.length };
            return { data: response.transactions, meta: response.meta || defaultMeta };
        }
        return { error: "Falha ao carregar dashboard" };
    }, [selectedDate]);

    const { data: transactions, meta, loading, refresh, setPage, setLimit } = usePagination<TransactionModelType>(fetchDashboard);

    useEffect(() => {
        refresh();
    }, [selectedDate, refresh]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleOpenModal = useCallback((transaction?: TransactionModelType) => {
        if (transaction) {
            setFormData({
                _id: transaction._id,
                title: transaction.title,
                amount: transaction.amount,
                type: transaction.type,
                date: formatInputDate(transaction.date),
                status: transaction.status,
                category: transaction.category ?? "",
                description: transaction.description ?? ""
            });
        } else {
            setFormData(INITIAL_FORM_DATA);
        }
        setModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        setFormData(INITIAL_FORM_DATA);
    }, []);

    const handleFormChange = useCallback((field: keyof TransactionFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleChangeMonth = useCallback((direction: "prev" | "next") => {
        setSelectedDate((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
            return newDate;
        });
    }, []);

    const handleSave = useCallback(async () => {
        if (!formData.title || formData.amount <= 0 || !formData.date) return;
        await useAction({
            action: async () => formData._id ? await updateTransaction(formData._id, formData) : await createTransaction(formData),
            toastMessages: { success: "Transação salva com sucesso", error: "Erro ao salvar transação", pending: "Salvando..." },
            callback: () => {
                refresh();
                handleCloseModal();
            }
        });
    }, [formData, refresh, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteTransaction(id),
            toastMessages: { success: "Transação removida", error: "Erro ao remover transação", pending: "Removendo..." },
            callback: refresh
        });
    }, [refresh]);

    const handleConfirm = useCallback(async (id: string) => {
        await useAction({
            action: async () => await confirmTransaction(id),
            toastMessages: { success: "Transação confirmada", error: "Erro ao confirmar transação", pending: "Confirmando..." },
            callback: refresh
        });
    }, [refresh]);

    return useMemo(() => ({
        meta,
        loading,
        formData,
        modalOpen,
        transactions,
        selectedDate,
        currentBalance,
        handleSave,
        handleDelete,
        handleConfirm,
        handleOpenModal,
        handleCloseModal,
        handleFormChange,
        handleChangeMonth,
        handlePaginationChange
    }), [meta, loading, formData, modalOpen, transactions, selectedDate, currentBalance, handleSave, handleDelete, handleConfirm, handleOpenModal, handleCloseModal, handleFormChange, handleChangeMonth, handlePaginationChange]);
};

export default useTreasuryHook;