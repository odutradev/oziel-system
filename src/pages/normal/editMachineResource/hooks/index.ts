import { getOperatorById, updateOperator, createOperator, deleteOperator } from '@actions/operators';
import { getFleetById, updateFleet, createFleet, deleteFleet } from '@actions/fleets';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

import { defaultResourceFormData } from './defaultValues';
import useAction from '@hooks/useAction';

import type { ResourceFormData, EditMachineResourceHookProps } from '../types';

const useEditMachineResource = (): EditMachineResourceHookProps => {
    const { type, resourceID } = useParams<{ type: string; resourceID: string }>();
    const navigate = useNavigate();

    const isNew = !resourceID;
    const isFleet = type === 'fleets';

    const [formData, setFormData] = useState<ResourceFormData>(defaultResourceFormData);
    const [initialFormData, setInitialFormData] = useState<ResourceFormData>(defaultResourceFormData);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (type !== 'fleets' && type !== 'operators') {
            navigate('/dashboard/maintenance/machine-resources');
            return;
        }
        if (!isNew && resourceID) loadResource();
    }, [type, resourceID, isNew, navigate]);

    const loadResource = async () => {
        if (!resourceID) return;
        setLoading(true);

        const result = isFleet ? await getFleetById(resourceID) : await getOperatorById(resourceID);

        if ('error' in result) {
            navigate('/dashboard/maintenance/machine-resources');
            return;
        }

        const mappedData: ResourceFormData = {
            name: result.name,
            active: result.active,
            description: 'description' in result ? result.description || '' : '',
            document: 'document' in result ? result.document || '' : ''
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
            name: formData.name,
            active: formData.active,
            ...(isFleet ? { description: formData.description } : { document: formData.document })
        };

        await useAction({
            action: async () => {
                if (isNew) return isFleet ? await createFleet(payload) : await createOperator(payload);
                return isFleet ? await updateFleet(resourceID!, payload) : await updateOperator(resourceID!, payload);
            },
            toastMessages: {
                success: `${isFleet ? 'Frota' : 'Operador'} salvo(a) com sucesso`,
                error: `Erro ao salvar ${isFleet ? 'frota' : 'operador'}`,
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
        if (!confirm(`Tem certeza que deseja deletar est${isFleet ? 'a frota' : 'e operador'}?`)) return;

        await useAction({
            action: async () => isFleet ? await deleteFleet(resourceID) : await deleteOperator(resourceID),
            toastMessages: {
                success: `${isFleet ? 'Frota' : 'Operador'} deletado(a) com sucesso`,
                error: `Erro ao deletar ${isFleet ? 'frota' : 'operador'}`,
                pending: 'Deletando...'
            },
            callback: () => navigate('/dashboard/maintenance/machine-resources')
        });
    };

    const handleCancel = () => navigate('/dashboard/maintenance/machine-resources');

    return {
        isNew,
        isFleet,
        loading,
        isSaving,
        formData,
        canSave: (isNew && isValid) || (isDirty && isValid),
        handleFieldChange,
        handleDelete,
        handleCancel,
        handleSave
    };
};

export default useEditMachineResource;