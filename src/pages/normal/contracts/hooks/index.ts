import { useState, useEffect, useCallback, useMemo } from "react";

import { getContracts, createContract, updateContract, deleteContract } from "@actions/contracts";
import { formatInputDate } from "@utils/formatters";
import useAction from "@hooks/useAction";

import type { CreateContractData, UpdateContractData } from "@actions/contracts/types";
import type { ContractModelType } from "@utils/types/models/contract";
import type { ContractsHookProps, ContractFormData } from "../types";

const INITIAL_FORM_DATA: ContractFormData = {
    deliveryForecast: formatInputDate(new Date()),
    contractDate: formatInputDate(new Date()),
    totalSalePrice: 0,
    totalValue: 0,
    code: "",
    type: ""
};

const useContractsHook = (): ContractsHookProps => {
    const [formData, setFormData] = useState<ContractFormData>(INITIAL_FORM_DATA);
    const [contracts, setContracts] = useState<ContractModelType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchContracts = useCallback(async () => {
        setLoading(true);
        const response = await getContracts({ limit: 1000 });
        if (response && !("error" in response)) setContracts(response.data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchContracts();
    }, [fetchContracts]);

    const handleOpenModal = useCallback((contract?: ContractModelType) => {
        if (contract) {
            setFormData({
                _id: contract._id,
                code: contract.code,
                type: contract.type,
                status: contract.status || "",
                totalValue: contract.totalValue || 0,
                totalSalePrice: contract.totalSalePrice || 0,
                contractDate: formatInputDate(contract.contractDate ? new Date(contract.contractDate) : new Date()),
                deliveryForecast: formatInputDate(contract.deliveryForecast ? new Date(contract.deliveryForecast) : new Date()),
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

    const handleFormChange = useCallback((field: keyof ContractFormData, value: unknown) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        if (!formData.code || !formData.type || !formData.contractDate || !formData.deliveryForecast) return;

        const isUpdate = !!formData._id;
        const payload = isUpdate
            ? { code: formData.code, type: formData.type, status: formData.status, totalValue: formData.totalValue, totalSalePrice: formData.totalSalePrice, contractDate: formData.contractDate, deliveryForecast: formData.deliveryForecast } as UpdateContractData
            : { code: formData.code, type: formData.type, totalValue: formData.totalValue, totalSalePrice: formData.totalSalePrice, contractDate: formData.contractDate, deliveryForecast: formData.deliveryForecast } as CreateContractData;

        await useAction({
            action: async () => isUpdate ? await updateContract(formData._id as string, payload as UpdateContractData) : await createContract(payload as CreateContractData),
            toastMessages: { success: "Contrato salvo com sucesso", error: "Erro ao salvar contrato", pending: "Salvando..." },
            callback: () => {
                fetchContracts();
                handleCloseModal();
            }
        });
    }, [formData, fetchContracts, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteContract(id),
            toastMessages: { success: "Contrato removido com sucesso", error: "Erro ao remover", pending: "Removendo..." },
            callback: fetchContracts
        });
    }, [fetchContracts]);

    return useMemo(() => ({
        handleFormChange,
        handleCloseModal,
        handleOpenModal,
        handleDelete,
        handleSave,
        contracts,
        modalOpen,
        formData,
        loading
    }), [handleFormChange, handleCloseModal, handleOpenModal, handleDelete, handleSave, contracts, modalOpen, formData, loading]);
};

export default useContractsHook;