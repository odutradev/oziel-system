import { useState, useRef, useEffect, useMemo } from 'react';

import { validateDocument } from '@utils/validations/documents';
import { updateProfile, updateProfileImage } from '@actions/user';
import { defaultProfileData } from './defaultValues';
import useUserStore from '@stores/user';
import useAction from '@hooks/useAction';

import type { ProfileHookProps, ProfileFormData } from '../types';

const useProfileForm = (): ProfileHookProps => {
  const { user } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [formData, setFormData] = useState<ProfileFormData>(defaultProfileData);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        description: user.description || '',
        cpfOrRg: user.cpfOrRg || '',
      });
    }
  }, [user]);

  const isDirty = useMemo(() => {
    if (!user) return false;
    return (
      (formData.name || '') !== (user.name || '') ||
      (formData.description || '') !== (user.description || '') ||
      (formData.cpfOrRg || '') !== (user.cpfOrRg || '')
    );
  }, [formData, user]);

  const isValid = useMemo(() => {
    if (!(formData.name || '').trim()) return false;

    if (formData.cpfOrRg !== (user?.cpfOrRg || '')) {
      return validateDocument(formData.cpfOrRg || '') === 'valid';
    }
    return true;
  }, [formData.name, formData.cpfOrRg, user]);

  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        description: user.description || '',
        cpfOrRg: user.cpfOrRg || '',
      });
    }
  };

  const handleSave = async () => {
    if (!isDirty || !isValid) return;

    setSaving(true);
    await useAction({
      action: async () => await updateProfile(formData),
      toastMessages: {
        success: 'Perfil atualizado com sucesso',
        error: 'Erro ao atualizar perfil',
        pending: 'Atualizando perfil...',
      },
      callback: () => {
        setSaving(false);
        window.location.reload();
      },
      onError: () => setSaving(false)
    });
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) return;

    if (file.size > 5 * 1024 * 1024) return;

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
        window.location.reload();
      },
      onError: () => setUploadingImage(false)
    });
  };

  const handleCropCancel = () => {
    setCropDialogOpen(false);
    setSelectedImageUrl('');
  };

  return {
    formData,
    user,
    saving,
    canSave: isDirty && isValid,
    uploadingImage,
    cropDialogOpen,
    selectedImageUrl,
    fileInputRef,
    handleReset,
    handleSave,
    handleNameChange: (val) => setFormData(prev => ({ ...prev, name: val })),
    handleCpfChange: (val) => setFormData(prev => ({ ...prev, cpfOrRg: val })),
    handleDescriptionChange: (val) => setFormData(prev => ({ ...prev, description: val })),
    handleImageClick,
    handleImageChange,
    handleCropConfirm,
    handleCropCancel,
  };
};

export default useProfileForm;