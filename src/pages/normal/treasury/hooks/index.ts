import { useState, useEffect, useCallback, useMemo } from "react";

import { getTreasuryDashboard, createTransaction, updateTransaction, confirmTransaction, deleteTransaction } from "@actions/treasury";
import { formatInputDate } from "@utils/formatters";
import useAction from "@hooks/useAction";

import type { DashboardResponse } from "@actions/treasury/types";
import type { TransactionModelType } from "@utils/types/models/transaction";
import type { TreasuryHookProps, TransactionFormData } from "../types";

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
    const [data, setData] = useState<DashboardResponse | null>(null);
    const [formData, setFormData] = useState<TransactionFormData>(INITIAL_FORM_DATA);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = useCallback(async () => {
        setLoading(true);
        const params = { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1 };
        const response = await getTreasuryDashboard(params);
        if (response && "currentBalance" in response) setData(response as DashboardResponse);
        setLoading(false);
    }, [selectedDate]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

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
                fetchDashboard();
                handleCloseModal();
            }
        });
    }, [formData, fetchDashboard, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteTransaction(id),
            toastMessages: { success: "Transação removida", error: "Erro ao remover transação", pending: "Removendo..." },
            callback: fetchDashboard
        });
    }, [fetchDashboard]);

    const handleConfirm = useCallback(async (id: string) => {
        await useAction({
            action: async () => await confirmTransaction(id),
            toastMessages: { success: "Transação confirmada", error: "Erro ao confirmar transação", pending: "Confirmando..." },
            callback: fetchDashboard
        });
    }, [fetchDashboard]);

    return useMemo(() => ({
        data,
        loading,
        formData,
        modalOpen,
        selectedDate,
        handleSave,
        handleDelete,
        handleConfirm,
        handleOpenModal,
        handleCloseModal,
        handleFormChange,
        handleChangeMonth
    }), [data, loading, formData, modalOpen, selectedDate, handleSave, handleDelete, handleConfirm, handleOpenModal, handleCloseModal, handleFormChange, handleChangeMonth]);
};

export default useTreasuryHook;