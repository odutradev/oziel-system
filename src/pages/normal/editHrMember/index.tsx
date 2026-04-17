import FormActions from '@components/formActions';
import Layout from '@components/layout';

import PersonalInfo from './subcomponents/personalInfo';
import useEditHrMember from './hooks';
import { PageContainer } from './styles';
import metadata from './metadata';

const EditHrMember = () => {
    const {
        isNew,
        formData,
        loading,
        canSave,
        isSaving,
        handleFieldChange,
        handleSave,
        handleDelete,
        handleCancel
    } = useEditHrMember();

    const currentMetadata = {
        ...metadata,
        pageTitle: isNew ? "Novo Membro" : "Editar Membro",
        breadcrumbs: [
            ...(metadata.breadcrumbs || []),
            { name: isNew ? "Novo" : "Editar", url: '#' }
        ]
    };

    return (
        <Layout {...currentMetadata} loading={loading}>
            <PageContainer>
                <PersonalInfo
                    formData={formData}
                    onChange={handleFieldChange}
                />

                <FormActions
                    saveLabel="Salvar"
                    deleteLabel="Deletar Membro"
                    disabled={!canSave}
                    loading={isSaving}
                    hideDelete={isNew}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onDelete={handleDelete}
                />
            </PageContainer>
        </Layout>
    );
};

export default EditHrMember;