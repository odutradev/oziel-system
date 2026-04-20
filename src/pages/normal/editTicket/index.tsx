import TicketForm from "./subcomponents/ticketForm";
import useEditTicketHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const EditTicket = () => {
    const { formData, isEditing, loading, handleFormChange, handleSave, handleCancel } = useEditTicketHook();

    const dynamicMetadata = {
        ...metadata,
        pageTitle: isEditing ? "Editar Chamado" : "Novo Chamado",
        breadcrumbs: [
            ...(metadata.breadcrumbs || []),
            { name: isEditing ? "Editar" : "Novo", url: "#" }
        ]
    };

    return (
        <Layout {...dynamicMetadata}>
            <TicketForm
                formData={formData}
                isEditing={isEditing}
                loading={loading}
                onChange={handleFormChange}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </Layout>
    );
};

export default EditTicket;