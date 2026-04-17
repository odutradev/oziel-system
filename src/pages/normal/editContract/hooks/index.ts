import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

import { getContractById, updateContract, createContract, deleteContract } from '@actions/contracts';
import { defaultContractFormData } from './defaultValues';
import { formatInputDate } from '@utils/formatters';
import useAction from '@hooks/useAction';

import type { CreateContractData, UpdateContractData } from '@actions/contracts/types';
import type { ContractFormData, EditContractHookProps } from '../types';

const useEditContract = (): EditContractHookProps => {
    const { contractID } = useParams<{ contractID: string }>();
    const navigate = useNavigate();
    const isNew = !contractID;

    const [loading, setLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<ContractFormData>(defaultContractFormData);
    const [initialFormData, setInitialFormData] = useState<ContractFormData>(defaultContractFormData);

    useEffect(() => {
        if (!isNew && contractID) loadContract();
    }, [contractID, isNew]);

    const loadContract = async () => {
        if (!contractID) return;
        setLoading(true);
        const result = await getContractById(contractID);
        if ('error' in result) {
            navigate('/dashboard/contracts');
            return;
        }

        const mappedData: ContractFormData = {
            code: result.code,
            type: result.type,
            status: result.status || 'ACTIVE',
            contractDate: result.contractDate ? formatInputDate(new Date(result.contractDate)) : '',
            deliveryForecast: result.deliveryForecast ? formatInputDate(new Date(result.deliveryForecast)) : '',
            endDate: result.endDate ? formatInputDate(new Date(result.endDate)) : '',
            totalValue: result.totalValue || 0,
            totalSalePrice: result.totalSalePrice || 0,
            detailsMarkdown: result.detailsMarkdown || ''
        };

        setFormData(mappedData);
        setInitialFormData(mappedData);
        setLoading(false);
    };

    const isDirty = useMemo(() => JSON.stringify(formData) !== JSON.stringify(initialFormData), [formData, initialFormData]);

    const isValid = useMemo(() => {
        return !!formData.code && !!formData.type && !!formData.status && !!formData.contractDate && formData.totalValue > 0;
    }, [formData]);

    const handleFieldChange = (field: keyof ContractFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!isValid) return;
        setIsSaving(true);

        const payload = {
            code: formData.code,
            type: formData.type,
            status: formData.status,
            totalValue: formData.totalValue,
            totalSalePrice: formData.totalSalePrice,
            contractDate: formData.contractDate,
            detailsMarkdown: formData.detailsMarkdown,
            ...(formData.deliveryForecast && { deliveryForecast: formData.deliveryForecast }),
            ...(formData.endDate && { endDate: formData.endDate })
        };

        await useAction({
            action: async () => isNew ? await createContract(payload as CreateContractData) : await updateContract(contractID!, payload as UpdateContractData),
            toastMessages: {
                success: 'Contrato salvo com sucesso',
                error: 'Erro ao salvar contrato',
                pending: 'Salvando...',
            },
            callback: () => {
                setIsSaving(false);
                navigate('/dashboard/contracts');
            },
            onError: () => setIsSaving(false)
        });
    };

    const handleDelete = async () => {
        if (!contractID) return;
        if (!confirm('Tem certeza que deseja deletar este contrato?')) return;
        await useAction({
            action: async () => await deleteContract(contractID),
            toastMessages: {
                success: 'Contrato deletado com sucesso',
                error: 'Erro ao deletar contrato',
                pending: 'Deletando...',
            },
            callback: () => navigate('/dashboard/contracts'),
        });
    };

    const handleCancel = () => navigate('/dashboard/contracts');

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

export default useEditContract;