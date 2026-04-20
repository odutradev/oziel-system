import TicketTable from "./subcomponents/ticketTable";
import useTicketsHook from "./hooks";
import Layout from "@components/layout";
import metadata from "./metadata";

const TicketsManagement = () => {
    const { tickets, loading, handleCreateNew, handleEdit, handleDelete } = useTicketsHook();

    return (
        <Layout {...metadata}>
            <TicketTable tickets={tickets} loading={loading} onCreateNew={handleCreateNew} onEdit={handleEdit} onDelete={handleDelete} />
        </Layout>
    );
};

export default TicketsManagement;