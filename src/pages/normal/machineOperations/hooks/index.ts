import { useState, useEffect, useCallback, useMemo } from "react";

import { getMonthlyDashboard, createMachineOperation, updateMachineOperation, updateMachineOperationStatus, deleteMachineOperation } from "@actions/machineOperations";
import { formatInputDate } from "@utils/formatters";
import { getOperators } from "@actions/operators";
import { getFleets } from "@actions/fleets";
import useAction from "@hooks/useAction";

import type { MonthlyDashboardMetrics, MachineOperationModelType, CreateOperationData, MachineOperationStatusType } from "@actions/machineOperations/types";
import type { MachineOperationsHookProps, OperationFormData } from "../types";
import type { OperatorModelType } from "@actions/operators/types";
import type { FleetModelType } from "@actions/fleets/types";

const INITIAL_FORM_DATA: OperationFormData = {
    operationDate: formatInputDate(new Date()),
    hourMeterServiceStart: 0,
    hourMeterServiceEnd: 0,
    hourMeterDeparture: 0,
    hourMeterArrival: 0,
    serviceDescription: "",
    hourlyRate: 0,
    operator: null,
    fleet: null
};

const useMachineOperationsHook = (): MachineOperationsHookProps => {
    const [formData, setFormData] = useState<OperationFormData>(INITIAL_FORM_DATA);
    const [operations, setOperations] = useState<MachineOperationModelType[]>([]);
    const [metrics, setMetrics] = useState<MonthlyDashboardMetrics | null>(null);
    const [operators, setOperators] = useState<OperatorModelType[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [fleets, setFleets] = useState<FleetModelType[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchDependencies = useCallback(async () => {
        const [opsRes, fleetsRes] = await Promise.all([getOperators({ limit: 1000 }), getFleets({ limit: 1000 })]);
        if (opsRes && !("error" in opsRes)) setOperators(opsRes.data);
        if (fleetsRes && !("error" in fleetsRes)) setFleets(fleetsRes.data);
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
            const flId = typeof operation.fleet === "object" && operation.fleet ? (operation.fleet as FleetModelType)._id : operation.fleet as string;
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
                fleet: fleets.find(f => f._id === flId) || null,
            });
        } else {
            setFormData(INITIAL_FORM_DATA);
        }
        setModalOpen(true);
    }, [operators, fleets]);

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
        if (!formData.operator || !formData.fleet || !formData.operationDate || !formData.serviceDescription) return;
        const payload: CreateOperationData = {
            hourMeterServiceStart: formData.hourMeterServiceStart,
            hourMeterServiceEnd: formData.hourMeterServiceEnd,
            hourMeterDeparture: formData.hourMeterDeparture,
            hourMeterArrival: formData.hourMeterArrival,
            serviceDescription: formData.serviceDescription,
            operationDate: formData.operationDate,
            hourlyRate: formData.hourlyRate,
            operator: formData.operator._id,
            fleet: formData.fleet._id,
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
        metrics,
        loading,
        formData,
        modalOpen,
        operations,
        selectedDate,
        operators,
        fleets,
        handleSave,
        handleDelete,
        handleOpenModal,
        handleCloseModal,
        handleFormChange,
        handleChangeMonth,
        handleStatusChange
    }), [metrics, loading, formData, modalOpen, operations, selectedDate, operators, fleets, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handleChangeMonth, handleStatusChange]);
};

export default useMachineOperationsHook;