import { useState, useEffect, useCallback, useMemo } from "react";

import { getHrMembers, createHrMember, updateHrMember, deleteHrMember } from "@actions/hrMembers";
import usePagination from "@hooks/usePagination";
import useAction from "@hooks/useAction";

import type { HrMemberModelType } from "@actions/hrMembers/types";
import type { HrMembersHookProps, HrMemberFormData } from "../types";

const INITIAL_FORM_DATA: HrMemberFormData = {
    name: "",
    cpfOrRg: "",
    email: "",
    phone: "",
    address: "",
    familyMembers: 0
};

const useHrMembersHook = (): HrMembersHookProps => {
    const [formData, setFormData] = useState<HrMemberFormData>(INITIAL_FORM_DATA);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchMembersList = useCallback(async (page: number, limit: number) => {
        return await getHrMembers({ page, limit });
    }, []);

    const { data: members, meta, loading, refresh, setPage, setLimit } = usePagination<HrMemberModelType>(fetchMembersList);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handlePaginationChange = useCallback((pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    }, [setPage, setLimit]);

    const handleOpenModal = useCallback((member?: HrMemberModelType) => {
        if (member) {
            setFormData({
                _id: member._id,
                name: member.name,
                cpfOrRg: member.cpfOrRg,
                email: member.email ?? "",
                phone: member.hrControl?.phone ?? "",
                address: member.hrControl?.address ?? "",
                familyMembers: member.hrControl?.familyMembers ?? 0
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

    const handleFormChange = useCallback((field: keyof HrMemberFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleSave = useCallback(async () => {
        if (!formData.name || !formData.cpfOrRg) return;

        const payload = {
            name: formData.name,
            cpfOrRg: formData.cpfOrRg,
            email: formData.email,
            hrControl: {
                phone: formData.phone,
                address: formData.address,
                familyMembers: Number(formData.familyMembers)
            }
        };

        await useAction({
            action: async () => formData._id ? await updateHrMember(formData._id, payload) : await createHrMember(payload),
            toastMessages: { success: "Membro salvo com sucesso", error: "Erro ao salvar membro", pending: "Salvando..." },
            callback: () => {
                refresh();
                handleCloseModal();
            }
        });
    }, [formData, refresh, handleCloseModal]);

    const handleDelete = useCallback(async (id: string) => {
        await useAction({
            action: async () => await deleteHrMember(id),
            toastMessages: { success: "Membro removido com sucesso", error: "Erro ao remover membro", pending: "Removendo..." },
            callback: refresh
        });
    }, [refresh]);

    return useMemo(() => ({
        meta,
        loading,
        members,
        formData,
        modalOpen,
        handleSave,
        handleDelete,
        handleOpenModal,
        handleCloseModal,
        handleFormChange,
        handlePaginationChange
    }), [meta, loading, members, formData, modalOpen, handleSave, handleDelete, handleOpenModal, handleCloseModal, handleFormChange, handlePaginationChange]);
};

export default useHrMembersHook;