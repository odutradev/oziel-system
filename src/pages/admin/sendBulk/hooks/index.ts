import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendBulkEmail, sendEmailToAllUsers } from '@actions/emails';
import { defaultSendBulkData } from './defaultValues';
import useAction from '@hooks/useAction';

import type { EmailRecipient } from '@actions/emails/types';
import type { SendBulkFormData } from '../types';

const useSendBulk = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SendBulkFormData>(defaultSendBulkData);
  const [loading, setLoading] = useState(false);

  const handleTriggerChange = (value: string) => {
    setFormData(prev => ({ ...prev, trigger: value }));
  };

  const handleAddRecipient = (email: string) => {
    if (formData.recipients.find(r => r.email === email)) return;
    setFormData(prev => ({ ...prev, recipients: [...prev.recipients, { email }] }));
  };

  const handleRemoveRecipient = (email: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r.email !== email)
    }));
  };

  const handleImportRecipients = (newRecipients: EmailRecipient[]) => {
    setFormData(prev => {
      const existingEmails = new Set(prev.recipients.map(r => r.email));
      const uniqueNew = newRecipients.filter(r => !existingEmails.has(r.email));
      return { ...prev, recipients: [...prev.recipients, ...uniqueNew] };
    });
  };

  const handleAddVariable = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      globalVariables: { ...prev.globalVariables, [key]: value }
    }));
  };

  const handleRemoveVariable = (key: string) => {
    setFormData(prev => {
      const newVars = { ...prev.globalVariables };
      delete newVars[key];
      return { ...prev, globalVariables: newVars };
    });
  };

  const validateSend = (requireRecipients = true) => {
    if (!formData.trigger) {
      alert('Informe o trigger do template');
      return false;
    }
    if (requireRecipients && formData.recipients.length === 0) {
      alert('Adicione pelo menos um destinatário');
      return false;
    }
    return true;
  };

  const handleSendBulk = async () => {
    if (!validateSend(true)) return;
    setLoading(true);

    try {
      await useAction({
        action: async () => await sendBulkEmail({
          trigger: formData.trigger,
          recipients: formData.recipients,
          variables: formData.globalVariables,
        }),
        toastMessages: {
          success: `${formData.recipients.length} email(s) enviado(s) com sucesso`,
          error: 'Erro ao enviar emails',
          pending: 'Enviando emails...',
        },
        callback: () => navigate('/dashboard/admin/emails')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendToAll = async () => {
    if (!validateSend(false)) return;
    if (!confirm('Tem certeza que deseja enviar para TODOS os usuários cadastrados?')) return;
    setLoading(true);

    try {
      await useAction({
        action: async () => await sendEmailToAllUsers({
          trigger: formData.trigger,
          variables: formData.globalVariables,
        }),
        toastMessages: {
          success: 'Emails enviados para todos os usuários',
          error: 'Erro ao enviar emails',
          pending: 'Enviando emails...',
        },
        callback: () => navigate('/dashboard/admin/emails')
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleTriggerChange,
    handleAddRecipient,
    handleRemoveRecipient,
    handleImportRecipients,
    handleAddVariable,
    handleRemoveVariable,
    handleSendBulk,
    handleSendToAll,
    handleCancel: () => navigate('/dashboard/admin/emails'),
  };
};

export default useSendBulk;