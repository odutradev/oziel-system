import TicketDashboard from "./subcomponents/ticketDashboard";
import TicketTable from "./subcomponents/ticketTable";
import Layout from "@components/layout";
import useTicketsHook from "./hooks";
import metadata from "./metadata";

const TicketsManagement = () => {
    const { metrics, tickets, loading, handleCreateNew, handleEdit, handleDelete } = useTicketsHook();

    return (
        <Layout {...metadata}>
            <TicketDashboard metrics={metrics} loading={loading} />
            <TicketTable tickets={tickets} loading={loading} onCreateNew={handleCreateNew} onEdit={handleEdit} onDelete={handleDelete} />
        </Layout>
    );
};

export default TicketsManagement;