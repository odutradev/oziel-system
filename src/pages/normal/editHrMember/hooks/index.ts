import { getHrMemberById, updateHrMember, createHrMember, deleteHrMember } from '@actions/hrMembers';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

import { validateDocument } from '@utils/validations/documents';
import { defaultHrMemberFormData } from './defaultValues';
import useAction from '@hooks/useAction';

import type { HrMemberFormData, EditHrMemberHookProps } from '../types';

const useEditHrMember = (): EditHrMemberHookProps => {
    const { memberID } = useParams<{ memberID: string }>();
    const navigate = useNavigate();
    const isNew = !memberID;

    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<HrMemberFormData>(defaultHrMemberFormData);
    const [initialFormData, setInitialFormData] = useState<HrMemberFormData>(defaultHrMemberFormData);

    useEffect(() => {
        if (!isNew && memberID) loadMember();
    }, [memberID, isNew]);

    const loadMember = async () => {
        if (!memberID) return;
        setLoading(true);
        const result = await getHrMemberById(memberID);
        if ('error' in result) {
            navigate('/dashboard/hr/members');
            return;
        }

        const mappedData: HrMemberFormData = {
            name: result.name,
            cpfOrRg: result.cpfOrRg,
            email: result.email || '',
            phone: result.hrControl?.phone || '',
            address: result.hrControl?.address || '',
            familyMembers: result.hrControl?.familyMembers || 0
        };

        setFormData(mappedData);
        setInitialFormData(mappedData);
        setLoading(false);
    };

    const isDirty = useMemo(() => JSON.stringify(formData) !== JSON.stringify(initialFormData), [formData, initialFormData]);

    const isValid = useMemo(() => {
        const isNameValid = !!(formData.name || '').trim();
        const isCpfValid = formData.cpfOrRg ? validateDocument(formData.cpfOrRg) === 'valid' || formData.cpfOrRg.length > 5 : false;
        return isNameValid && isCpfValid;
    }, [formData.name, formData.cpfOrRg]);

    const handleFieldChange = (field: keyof HrMemberFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!isValid) return;
        setIsSaving(true);

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
            action: async () => isNew ? await createHrMember(payload) : await updateHrMember(memberID!, payload),
            toastMessages: {
                success: 'Membro salvo com sucesso',
                error: 'Erro ao salvar membro',
                pending: 'Salvando...',
            },
            callback: () => {
                setIsSaving(false);
                navigate('/dashboard/hr/members');
            },
            onError: () => setIsSaving(false)
        });
    };

    const handleDelete = async () => {
        if (!memberID) return;
        if (!confirm('Tem certeza que deseja deletar este membro?')) return;
        await useAction({
            action: async () => await deleteHrMember(memberID),
            toastMessages: {
                success: 'Membro deletado com sucesso',
                error: 'Erro ao deletar membro',
                pending: 'Deletando...',
            },
            callback: () => navigate('/dashboard/hr/members'),
        });
    };

    const handleCancel = () => navigate('/dashboard/hr/members');

    return {
        isNew,
        formData,
        loading,
        isSaving,
        canSave: (isNew && isValid) || (isDirty && isValid),
        handleFieldChange,
        handleSave,
        handleDelete,
        handleCancel
    };
};

export default useEditHrMember;