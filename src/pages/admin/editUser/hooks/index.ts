import { getUserById, updateUserById, deleteUserById, updateProfileImage } from '@actions/user';
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { validateDocument } from '@utils/validations/documents';
import { defaultUserFormData } from './defaultValues';
import useAction from '@hooks/useAction';

import type { UserFormData, UserHookProps } from '../types';

const useUserForm = (): UserHookProps => {
  const { userID } = useParams<{ userID: string }>();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [formData, setFormData] = useState<UserFormData>(defaultUserFormData);
  const [initialFormData, setInitialFormData] = useState<UserFormData>(defaultUserFormData);

  useEffect(() => {
    if (userID) loadUser();
  }, [userID]);

  const loadUser = async () => {
    if (!userID) return;
    setLoading(true);
    const result = await getUserById(userID);
    if ('error' in result) {
      navigate('/dashboard/admin/users');
      return;
    }
    setFormData(result);
    setInitialFormData(result);
    setLoading(false);
  };

  const isDirty = useMemo(() => JSON.stringify(formData) !== JSON.stringify(initialFormData), [formData, initialFormData]);

  const isValid = useMemo(() => {
    const isNameValid = !!(formData.name || '').trim();
    const isCpfValid = formData.cpfOrRg ? validateDocument(formData.cpfOrRg) === 'valid' : true;
    return isNameValid && isCpfValid;
  }, [formData.name, formData.cpfOrRg]);

  const handleSave = async () => {
    if (!userID || !isValid) return;

    const changedFields: UserFormData = {};
    (Object.keys(formData) as Array<keyof UserFormData>).forEach((key) => {
      if (formData[key] !== initialFormData[key]) {
        changedFields[key] = formData[key] as any;
      }
    });

    if (Object.keys(changedFields).length === 0) return;

    setIsSaving(true);
    await useAction({
      action: async () => await updateUserById(userID, changedFields),
      toastMessages: {
        success: 'Usuário atualizado com sucesso',
        error: 'Erro ao atualizar usuário',
        pending: 'Atualizando usuário...',
      },
      callback: () => {
        setIsSaving(false);
        navigate('/dashboard/admin/users');
      },
      onError: () => setIsSaving(false)
    });
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
    await useAction({
      action: async () => await deleteUserById(userID!),
      toastMessages: {
        success: 'Usuário deletado com sucesso',
        error: 'Erro ao deletar usuário',
        pending: 'Deletando usuário...',
      },
      callback: () => navigate('/dashboard/admin/users'),
    });
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImageUrl(e.target?.result as string);
      setCropDialogOpen(true);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCropConfirm = async (croppedFile: File) => {
    setCropDialogOpen(false);
    setUploadingImage(true);
    await useAction({
      action: async () => await updateProfileImage(croppedFile),
      toastMessages: {
        success: 'Foto atualizada com sucesso',
        error: 'Erro ao atualizar foto',
        pending: 'Enviando foto...',
      },
      callback: () => {
        setUploadingImage(false);
        loadUser();
      },
      onError: () => setUploadingImage(false)
    });
  };

  return {
    formData,
    loading,
    isSaving,
    canSave: isDirty && isValid,
    uploadingImage,
    cropDialogOpen,
    selectedImageUrl,
    fileInputRef,
    handleNameChange: (val) => setFormData(prev => ({ ...prev, name: val })),
    handleCpfChange: (val) => setFormData(prev => ({ ...prev, cpfOrRg: val })),
    handleDescriptionChange: (val) => setFormData(prev => ({ ...prev, description: val })),
    handleStatusChange: (val) => setFormData(prev => ({ ...prev, status: val as UserFormData['status'] })),
    handleSave,
    handleDelete,
    handleCancel: () => navigate('/dashboard/admin/users'),
    handleImageClick,
    handleImageChange,
    handleCropConfirm,
    handleCropCancel: () => setCropDialogOpen(false),
  };
};

export default useUserForm;