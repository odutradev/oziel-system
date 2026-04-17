import FormActions from '@components/formActions';
import Layout from '@components/layout';

import PersonalInfo from './subcomponents/personalInfo';
import { PageContainer } from './styles';
import useEditHrMember from './hooks';
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
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onDelete={isNew ? undefined : handleDelete}
                />
            </PageContainer>
        </Layout>
    );
};

export default EditHrMember;