import { CircularProgress, Box } from '@mui/material';

import ResourceStatus from './subcomponents/resourceStatus';
import ResourceInfo from './subcomponents/resourceInfo';
import FormActions from '@components/formActions';
import useEditMachineResource from './hooks';
import { PageContainer } from './styles';
import Layout from '@components/layout';
import metadata from './metadata';

const EditMachineResource = () => {
    const {
        handleFieldChange,
        handleCancel,
        handleDelete,
        handleSave,
        formData,
        isSaving,
        canSave,
        loading,
        isAsset,
        isNew
    } = useEditMachineResource();

    const resourceName = isAsset ? "Ativo" : "Operador";

    const currentMetadata = {
        ...metadata,
        pageTitle: isNew ? `Novo ${resourceName}` : `Editar ${resourceName}`,
        breadcrumbs: [
            ...(metadata.breadcrumbs || []),
            { name: isNew ? "Novo" : "Editar", url: '#' }
        ]
    };

    return (
        <Layout {...currentMetadata}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 400 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <PageContainer>
                    <ResourceInfo
                        onChange={handleFieldChange}
                        formData={formData}
                        isAsset={isAsset}
                    />

                    <ResourceStatus
                        onChange={handleFieldChange}
                        formData={formData}
                    />

                    <FormActions
                        deleteLabel={`Deletar ${resourceName}`}
                        onDelete={isNew ? undefined : handleDelete}
                        onCancel={handleCancel}
                        disabled={!canSave}
                        loading={isSaving}
                        onSave={handleSave}
                        saveLabel="Salvar"
                    />
                </PageContainer>
            )}
        </Layout>
    );
};

export default EditMachineResource;