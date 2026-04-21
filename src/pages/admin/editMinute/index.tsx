import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import HistoryTimeline from "./subcomponents/historyTimeline";
import MinuteContent from "./subcomponents/minuteContent";
import BasicInfo from "./subcomponents/basicInfo";
import FormActions from "@components/formActions";
import Layout from "@components/layout";
import useEditMinute from "./hooks";
import metadata from "./metadata";

const EditMinute = () => {
    const { minuteID } = useParams();
    const navigate = useNavigate();
    const { handleChange, handleSave, formData, history, loading, saving } = useEditMinute(minuteID);

    const isEditing = Boolean(minuteID);
    const pageMetadata = { ...metadata, pageTitle: isEditing ? "Visualizar e Editar Ata" : "Nova Ata de Reunião" };

    return (
        <Layout {...pageMetadata}>
            {loading ? (
                <Box alignItems="center" justifyContent="center" display="flex" p={8}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box flexDirection="column" display="flex" gap={3}>
                    <BasicInfo
                        onChange={handleChange}
                        formData={formData}
                    />
                    <MinuteContent
                        onChange={handleChange}
                        formData={formData}
                    />
                    <FormActions
                        onCancel={() => navigate("/dashboard/admin/secretary/minutes")}
                        disabled={saving || !formData.title || !formData.content}
                        loading={saving}
                        onSave={handleSave}
                    />
                    {isEditing && (
                        <HistoryTimeline history={history} />
                    )}
                </Box>
            )}
        </Layout>
    );
};

export default EditMinute;