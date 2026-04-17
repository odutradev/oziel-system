import FormActions from '@components/formActions';
import Layout from '@components/layout';

import ResourceStatus from './subcomponents/resourceStatus';
import ResourceInfo from './subcomponents/resourceInfo';
import useEditMachineResource from './hooks';
import { PageContainer } from './styles';
import metadata from './metadata';

const EditMachineResource = () => {
    const {
        isNew,
        isFleet,
        loading,
        canSave,
        isSaving,
        formData,
        handleSave,
        handleCancel,
        handleDelete,
        handleFieldChange
    } = useEditMachineResource();

    const resourceName = isFleet ? "Frota" : "Operador";

    const currentMetadata = {
        ...metadata,
        pageTitle: isNew ? `Nov${isFleet ? 'a' : 'o'} ${resourceName}` : `Editar ${resourceName}`,
        breadcrumbs: [
            ...(metadata.breadcrumbs || []),
            { name: isNew ? "Novo" : "Editar", url: '#' }
        ]
    };

    return (
        <Layout {...currentMetadata} loading={loading}>
            <PageContainer>
                <ResourceInfo
                    formData={formData}
                    isFleet={isFleet}
                    onChange={handleFieldChange}
                />

                <ResourceStatus
                    formData={formData}
                    onChange={handleFieldChange}
                />

                <FormActions
                    saveLabel="Salvar"
                    deleteLabel={`Deletar ${resourceName}`}
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

export default EditMachineResource;