import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import { getEmailTemplateByTrigger, createEmailTemplate, updateEmailTemplate, deleteEmailTemplate } from '@actions/emails';
import { defaultTemplateData } from './defaultValues';
import useAction from '@hooks/useAction';

import type { ValidationStatus } from '@components/inputWithValidation/types';
import type { EmailTemplateModelType } from '@actions/emails/types';
import type { TemplateFormData } from '../types';

const DEBOUNCE_DELAY = 800;

const useTemplateForm = () => {
  const { templateID } = useParams<{ templateID: string }>();
  const userEditedTrigger = useRef(false);
  const isNew = templateID === 'new';
  const navigate = useNavigate();

  const [triggerValidationStatus, setTriggerValidationStatus] = useState<ValidationStatus>('idle');
  const [initialData, setInitialData] = useState<TemplateFormData>(defaultTemplateData);
  const [formData, setFormData] = useState<TemplateFormData>(defaultTemplateData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isNew && templateID) loadTemplate();
  }, [templateID]);

  useEffect(() => {
    if (!userEditedTrigger.current || !formData.trigger) {
      if (!formData.trigger) setTriggerValidationStatus('idle');
      return;
    }

    const timer = setTimeout(async () => {
      setTriggerValidationStatus('loading');
      const isAvailable = await checkAvailability(formData.trigger || '', isNew ? undefined : templateID);
      setTriggerValidationStatus(isAvailable ? 'valid' : 'invalid');
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [formData.trigger]);

  const loadTemplate = async () => {
    if (!templateID) return;
    setLoading(true);
    const result = await getEmailTemplateByTrigger(templateID);

    if ('error' in result) {
      navigate('/dashboard/admin/emails');
      return;
    }

    setFormData(result);
    setInitialData(result);
    setLoading(false);
  };

  const checkAvailability = async (trigger: string, currentId?: string): Promise<boolean> => {
    if (!trigger) return false;
    const result = await getEmailTemplateByTrigger(trigger);
    if ('error' in result) return true;
    if (currentId && result._id === currentId) return true;
    return false;
  };

  const handleSave = async () => {
    if (triggerValidationStatus === 'invalid') return;

    await useAction({
      action: async () => {
        if (isNew) return await createEmailTemplate(formData as unknown as EmailTemplateModelType);
        return await updateEmailTemplate(templateID!, formData);
      },
      toastMessages: {
        success: isNew ? 'Template criado com sucesso' : 'Template atualizado com sucesso',
        error: isNew ? 'Erro ao criar template' : 'Erro ao atualizar template',
        pending: isNew ? 'Criando template...' : 'Atualizando template...',
      },
      callback: () => navigate('/dashboard/admin/emails'),
    });
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar este template?')) return;

    await useAction({
      action: async () => await deleteEmailTemplate(templateID!),
      toastMessages: {
        success: 'Template deletado com sucesso',
        error: 'Erro ao deletar template',
        pending: 'Deletando template...',
      },
      callback: () => navigate('/dashboard/admin/emails'),
    });
  };

  const handleTriggerChange = (value: string) => {
    userEditedTrigger.current = true;
    setTriggerValidationStatus('idle');
    setFormData(prev => ({ ...prev, trigger: value.toUpperCase().replace(/\s+/g, '_') }));
  };

  const isDirty = JSON.stringify(formData) !== JSON.stringify(initialData);

  return {
    formData,
    loading,
    isNew,
    isDirty,
    triggerValidationStatus,
    handleTriggerChange,
    handleSubjectChange: (val: string) => setFormData(prev => ({ ...prev, subject: val })),
    handleDescriptionChange: (val: string) => setFormData(prev => ({ ...prev, description: val })),
    handleStatusChange: (val: boolean) => setFormData(prev => ({ ...prev, active: val })),
    handleBodyChange: (val: string) => setFormData(prev => ({ ...prev, markdownBody: val })),
    handleSave,
    handleDelete,
    handleCancel: () => navigate('/dashboard/admin/emails'),
  };
};

export default useTemplateForm;