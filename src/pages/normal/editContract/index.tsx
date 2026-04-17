import FormActions from '@components/formActions';
import Layout from '@components/layout';

import ContractStatus from './subcomponents/contractStatus';
import ContractInfo from './subcomponents/contractInfo';
import { PageContainer } from './styles';
import useEditContract from './hooks';
import metadata from './metadata';

const EditContract = () => {
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
    } = useEditContract();

    const currentMetadata = {
        ...metadata,
        pageTitle: isNew ? "Novo Contrato" : "Editar Contrato",
        breadcrumbs: [
            ...(metadata.breadcrumbs || []),
            { name: isNew ? "Novo" : "Editar", url: '#' }
        ]
    };

    return (
        <Layout {...currentMetadata} loading={loading}>
            <PageContainer>
                <ContractInfo
                    formData={formData}
                    onChange={handleFieldChange}
                />

                <ContractStatus
                    formData={formData}
                    onChange={handleFieldChange}
                />

                <FormActions
                    saveLabel="Salvar"
                    deleteLabel="Deletar Contrato"
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

export default EditContract;