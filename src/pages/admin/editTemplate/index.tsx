import FormActions from '@components/formActions';
import Layout from '@components/layout';

import TemplateInfo from './subcomponents/templateInfo';
import EmailBody from './subcomponents/emailBody';
import { PageContainer } from './styles';
import useTemplateForm from './hooks';
import metadata from './metadata';

const EmailTemplateEdit = () => {
  const { formData, loading, isNew, isDirty, triggerValidationStatus, handleTriggerChange, handleSubjectChange, handleDescriptionChange, handleStatusChange, handleBodyChange, handleSave, handleDelete, handleCancel } = useTemplateForm();

  return (
    <Layout {...metadata} loading={loading}>
      <PageContainer>
        <TemplateInfo
          formData={formData}
          isNew={isNew}
          validationStatus={triggerValidationStatus}
          onTriggerChange={handleTriggerChange}
          onSubjectChange={handleSubjectChange}
          onDescriptionChange={handleDescriptionChange}
          onStatusChange={handleStatusChange}
        />

        <EmailBody
          formData={formData}
          onBodyChange={handleBodyChange}
        />

        <FormActions
          saveLabel={isNew ? 'Criar Template' : 'Salvar Alterações'}
          disabled={!isDirty || triggerValidationStatus === 'invalid' || triggerValidationStatus === 'loading'}
          onSave={handleSave}
          onDelete={!isNew ? handleDelete : undefined}
          onCancel={handleCancel}
        />
      </PageContainer>
    </Layout>
  );
};

export default EmailTemplateEdit;