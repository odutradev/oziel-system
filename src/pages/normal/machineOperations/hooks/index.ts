import { useState, useEffect, useCallback, useMemo } from "react";

import { updateMachineOperationStatus, createMachineOperation, updateMachineOperation, deleteMachineOperation, getMonthlyDashboard } from "@actions/machineOperations";
import { formatInputDate } from "@utils/formatters";
import { getOperators } from "@actions/operators";
import { getAssets } from "@actions/assets";
import useAction from "@hooks/useAction";

import type { MachineOperationStatusType, MachineOperationModelType, MonthlyDashboardMetrics, CreateOperationData } from "@actions/machineOperations/types";
import type { MachineOperationsHookProps, OperationFormData } from "../types";
import type { OperatorModelType } from "@actions/operators/types";
import type { AssetModelType } from "@actions/assets/types";

const INITIAL_FORM_DATA: OperationFormData = {
    operationDate: formatInputDate(new Date()),
    hourMeterServiceStart: 0,
    hourMeterServiceEnd: 0,
    hourMeterDeparture: 0,
    hourMeterArrival: 0,
    serviceDescription: "",
    hourlyRate: 0,
    operator: null,
    asset: null
};

const useMachineOperationsHook = (): MachineOperationsHookProps => {
    const [formData, setFormData] = useState<OperationFormData>(INITIAL_FORM_DATA);
    const [operations, setOperations] = useState<MachineOperationModelType[]>([]);
    const [metrics, setMetrics] = useState<MonthlyDashboardMetrics | null>(null);
    const [operators, setOperators] = useState<OperatorModelType[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [assets, setAssets] = useState<AssetModelType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchDependencies = useCallback(async () => {
        const [opsRes, assetsRes] = await Promise.all([getOperators({ limit: 1000 }), getAssets({ limit: 1000 })]);
        if (opsRes && !("error" in opsRes)) setOperators(opsRes.data);
        if (assetsRes && !("error" in assetsRes)) setAssets(assetsRes.data);
    }, []);

    const fetchDashboard = useCallback(async () => {
        setLoading(true);
        const params = { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1 };
        const response = await getMonthlyDashboard(params);
        if (response && !("error" in response)) {
            setMetrics(response.metrics);
            setOperations(response.operations);
        }
        setLoading(false);
    }, [selectedDate]);

    useEffect(() => {
        fetchDependencies();
    }, [fetchDependencies]);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    const handleOpenModal = useCallback((operation?: MachineOperationModelType) => {
        if (operation) {
            const opId = typeof operation.operator === "object" && operation.operator ? (operation.operator as OperatorModelType)._id : operation.operator as string;
            const assetId = typeof operation.asset === "object" && operation.asset ? (operation.asset as AssetModelType)._id : operation.asset as string;
            setFormData({
                _id: operation._id,
                operationDate: formatInputDate(operation.operationDate ? new Date(operation.operationDate) : new Date()),
                hourMeterServiceStart: operation.hourMeterServiceStart || 0,
                hourMeterServiceEnd: operation.hourMeterServiceEnd || 0,
                hourMeterDeparture: operation.hourMeterDeparture || 0,
                hourMeterArrival: operation.hourMeterArrival || 0,
                serviceDescription: operation.serviceDescription || "",
                hourlyRate: operation.hourlyRate || 0,
                operator: operators.find(o => o._id === opId) || null,
                asset: assets.find(a => a._id === assetId) || null,
            });
        } else {
            setFormData(INITIAL_FORM_DATA);
        }
        setModalOpen(true);
    }, [operators, assets]);

    const handleCloseModal = useCallback(() => {
        setModalOpen(false);
        setFormData(INITIAL_FORM_DATA);
    }, []);

    const handleFormChange = useCallback((field: keyof OperationFormData, value: unknown) => {
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
        if (!formData.operator || !formData.asset || !formData.operationDate || !formData.serviceDescription) return;
        const payload: CreateOperationData = {
            hourMeterServiceStart: formData.hourMeterServiceStart,
            hourMeterServiceEnd: formData.hourMeterServiceEnd,
            hourMeterDeparture: formData.hourMeterDeparture,
            hourMeterArrival: formData.hourMeterArrival,
            serviceDescription: formData.serviceDescription,
            operationDate: formData.operationDate,
            hourlyRate: formData.hourlyRate,
            operator: formData.operator._id,
            asset: formData.asset._id,
        };
        await useAction({
            action: async () => formData._id ? await updateMachineOperation(formData._id, payload) : await createMachineOperation(payload),
            toastMessages: { success: "Operação salva com sucesso", error: "Erro ao salvar operação", pending: "Salvando..." },
            callback: () => {
                fetchDashboard();
                handleCloseModal();
            }
        });
    }, [formData, fetchDashboard, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteMachineOperation(id),
            toastMessages: { success: "Operação removida com sucesso", error: "Erro ao remover operação", pending: "Removendo..." },
            callback: fetchDashboard
        });
    }, [fetchDashboard]);

    const handleStatusChange = useCallback(async (id: string, status: MachineOperationStatusType) => {
        await useAction({
            action: async () => await updateMachineOperationStatus(id, { status }),
            toastMessages: { success: "Status atualizado", error: "Erro ao atualizar status", pending: "Atualizando..." },
            callback: fetchDashboard
        });
    }, [fetchDashboard]);

    return useMemo(() => ({
        handleStatusChange,
        handleChangeMonth,
        handleFormChange,
        handleCloseModal,
        handleOpenModal,
        selectedDate,
        handleDelete,
        handleSave,
        operations,
        modalOpen,
        operators,
        formData,
        loading,
        metrics,
        assets
    }), [metrics, loading, formData, modalOpen, operations, selectedDate, operators, assets, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handleChangeMonth, handleStatusChange]);
};

export default useMachineOperationsHook;