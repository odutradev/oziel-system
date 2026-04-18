import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, CircularProgress } from "@mui/material";

import MarketingForm from "./subcomponents/marketingForm";
import { PageContainer, ActionButtons } from "./styles";
import Layout from "@components/layout";
import useEditMarketing from "./hooks";
import metadata from "./metadata";

const EditMarketing = () => {
    const { itemID } = useParams();
    const navigate = useNavigate();
    const { formData, loading, saving, handleChange, handleSave } = useEditMarketing(itemID);

    const isEditing = Boolean(itemID);
    const pageMetadata = { ...metadata, pageTitle: isEditing ? "Editar Solicitação de Marketing" : "Novo Rascunho de Marketing" };

    return (
        <Layout {...pageMetadata}>
            <PageContainer>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" p={8}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <MarketingForm formData={formData} onChange={handleChange} isEditing={isEditing} />
                        <ActionButtons>
                            <Button variant="outlined" color="inherit" onClick={() => navigate("/dashboard/admin/marketing")} disabled={saving}>
                                Cancelar
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || !formData.title || !formData.description}>
                                {saving ? "Salvando..." : "Salvar"}
                            </Button>
                        </ActionButtons>
                    </>
                )}
            </PageContainer>
        </Layout>
    );
};

export default EditMarketing;