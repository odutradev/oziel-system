import { getOperatorById, updateOperator, createOperator, deleteOperator } from '@actions/operators';
import { getAssetById, updateAsset, createAsset, deleteAsset } from '@actions/assets';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

import { defaultResourceFormData } from './defaultValues';
import useAction from '@hooks/useAction';

import type { EditMachineResourceHookProps, ResourceFormData } from '../types';

const useEditMachineResource = (): EditMachineResourceHookProps => {
    const { type, resourceID } = useParams<{ type: string; resourceID: string }>();
    const navigate = useNavigate();

    const isNew = !resourceID;
    const isAsset = type === 'assets';

    const [initialFormData, setInitialFormData] = useState<ResourceFormData>(defaultResourceFormData);
    const [formData, setFormData] = useState<ResourceFormData>(defaultResourceFormData);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (type !== 'assets' && type !== 'operators') {
            navigate('/dashboard/maintenance/machine-resources');
            return;
        }
        if (!isNew && resourceID) loadResource();
    }, [type, resourceID, isNew, navigate]);

    const loadResource = async () => {
        if (!resourceID) return;
        setLoading(true);

        const result = isAsset ? await getAssetById(resourceID) : await getOperatorById(resourceID);

        if ('error' in result) {
            navigate('/dashboard/maintenance/machine-resources');
            return;
        }

        const mappedData: ResourceFormData = {
            description: 'description' in result ? result.description || '' : '',
            document: 'document' in result ? result.document || '' : '',
            active: result.active,
            name: result.name
        };

        setFormData(mappedData);
        setInitialFormData(mappedData);
        setLoading(false);
    };

    const isDirty = useMemo(() => JSON.stringify(formData) !== JSON.stringify(initialFormData), [formData, initialFormData]);

    const isValid = useMemo(() => !!(formData.name || '').trim(), [formData.name]);

    const handleFieldChange = (field: keyof ResourceFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!isValid) return;
        setIsSaving(true);

        const payload = {
            ...(isAsset ? { description: formData.description } : { document: formData.document }),
            active: formData.active,
            name: formData.name
        };

        await useAction({
            action: async () => {
                if (isNew) return isAsset ? await createAsset(payload) : await createOperator(payload);
                return isAsset ? await updateAsset(resourceID!, payload) : await updateOperator(resourceID!, payload);
            },
            toastMessages: {
                success: `${isAsset ? 'Ativo' : 'Operador'} salvo com sucesso`,
                error: `Erro ao salvar ${isAsset ? 'ativo' : 'operador'}`,
                pending: 'Salvando...'
            },
            callback: () => {
                setIsSaving(false);
                navigate('/dashboard/maintenance/machine-resources');
            },
            onError: () => setIsSaving(false)
        });
    };

    const handleDelete = async () => {
        if (!resourceID) return;
        if (!confirm(`Tem certeza que deseja deletar este ${isAsset ? 'ativo' : 'operador'}?`)) return;

        await useAction({
            action: async () => isAsset ? await deleteAsset(resourceID) : await deleteOperator(resourceID),
            toastMessages: {
                success: `${isAsset ? 'Ativo' : 'Operador'} deletado com sucesso`,
                error: `Erro ao deletar ${isAsset ? 'ativo' : 'operador'}`,
                pending: 'Deletando...'
            },
            callback: () => navigate('/dashboard/maintenance/machine-resources')
        });
    };

    const handleCancel = () => navigate('/dashboard/maintenance/machine-resources');

    return {
        handleFieldChange,
        handleCancel,
        handleDelete,
        handleSave,
        formData,
        isSaving,
        loading,
        canSave: (isNew && isValid) || (isDirty && isValid),
        isAsset,
        isNew
    };
};

export default useEditMachineResource;