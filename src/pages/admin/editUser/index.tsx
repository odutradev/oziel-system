import FormActions from '@components/formActions';
import Layout from '@components/layout';

import AccountSettings from './subcomponents/accountSettings';
import ProfileHeader from './subcomponents/profileHeader';
import UserInfo from './subcomponents/userInfo';
import metadata from './metadata';
import useUserForm from './hooks';
import { PageContainer } from './styles';

const UserEdit = () => {
  const {
    formData,
    loading,
    canSave,
    isSaving,
    uploadingImage,
    cropDialogOpen,
    selectedImageUrl,
    fileInputRef,
    handleNameChange,
    handleCpfChange,
    handleDescriptionChange,
    handleStatusChange,
    handleRoleChange,
    handleSave,
    handleDelete,
    handleCancel,
    handleImageClick,
    handleImageChange,
    handleCropConfirm,
    handleCropCancel
  } = useUserForm();

  return (
    <Layout {...metadata} loading={loading}>
      <PageContainer>
        <ProfileHeader
          user={formData}
          uploading={uploadingImage}
          cropOpen={cropDialogOpen}
          imageUrl={selectedImageUrl}
          fileInputRef={fileInputRef}
          onImageClick={handleImageClick}
          onImageChange={handleImageChange}
          onCropConfirm={handleCropConfirm}
          onCropCancel={handleCropCancel}
        />

        <UserInfo
          formData={formData}
          onNameChange={handleNameChange}
          onCpfChange={handleCpfChange}
          onDescriptionChange={handleDescriptionChange}
        />

        <AccountSettings
          formData={formData}
          onStatusChange={handleStatusChange}
          onRoleChange={handleRoleChange}
        />

        <FormActions
          saveLabel="Salvar Alterações"
          deleteLabel="Deletar Usuário"
          disabled={!canSave}
          loading={isSaving}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </PageContainer>
    </Layout>
  );
};

export default UserEdit;