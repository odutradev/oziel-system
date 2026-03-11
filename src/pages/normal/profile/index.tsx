import { PageContainer } from './styles';
import ActionSection from './subcomponents/actionSection';
import ProfileHeader from './subcomponents/profileHeader';
import PersonalData from './subcomponents/personalData';
import AccountStatus from './subcomponents/accountStatus';
import FormActions from '@components/formActions';
import Layout from '@components/layout';
import useProfileForm from './hooks';
import metadata from './metadata';

const Profile = () => {
  const {
    formData,
    user,
    saving,
    canSave,
    uploadingImage,
    cropDialogOpen,
    selectedImageUrl,
    fileInputRef,
    handleReset,
    handleSave,
    handleNameChange,
    handleCpfChange,
    handleDescriptionChange,
    handleImageClick,
    handleImageChange,
    handleCropConfirm,
    handleCropCancel
  } = useProfileForm();

  return (
    <Layout {...metadata}>
      <PageContainer>
        <ProfileHeader
          user={user}
          uploading={uploadingImage}
          cropOpen={cropDialogOpen}
          imageUrl={selectedImageUrl}
          fileInputRef={fileInputRef}
          onImageClick={handleImageClick}
          onImageChange={handleImageChange}
          onCropConfirm={handleCropConfirm}
          onCropCancel={handleCropCancel}
        />
        <PersonalData
          formData={formData}
          onNameChange={handleNameChange}
          onCpfChange={handleCpfChange}
          onDescriptionChange={handleDescriptionChange}
        />
        <AccountStatus user={user} />
        <ActionSection userEmail={user?.email} />
        <FormActions
          onSave={handleSave}
          onCancel={handleReset}
          disabled={!canSave}
          loading={saving || uploadingImage}
          saveLabel="Salvar Alterações"
          cancelLabel="Desfazer"
        />
      </PageContainer>
    </Layout>
  );
};

export default Profile;