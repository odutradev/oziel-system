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
        <Layout {...currentMetadata}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 400 }}>
                    <CircularProgress />
                </Box>
            ) : (
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
            )}
        </Layout>
    );
};

export default EditMachineResource;