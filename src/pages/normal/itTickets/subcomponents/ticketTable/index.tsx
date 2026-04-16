import { Edit, Delete } from "@mui/icons-material";

import FullTable from "@components/fullTable";
import { StatusChip } from "./styles";

import type { TicketModelType, TicketPriority, TicketStatus } from "@actions/itTickets/types";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { TicketTableProps } from "./types";

const getPriorityColor = (priority?: TicketPriority) => {
    if (priority === "CRITICAL") return "error";
    if (priority === "HIGH") return "warning";
    if (priority === "MEDIUM") return "info";
    return "success";
};

const getStatusColor = (status?: TicketStatus) => {
    if (status === "CLOSED") return "success";
    if (status === "INTERVENTION" || status === "ANALYSIS" || status === "TESTING") return "warning";
    if (status === "WAITING_USER") return "info";
    if (status === "OPEN") return "error";
    return "default";
};

const TicketTable = ({ tickets, onEdit, onDelete }: TicketTableProps) => {
    const columns: TableColumn<TicketModelType>[] = [
        { key: "title", label: "Título", render: (row) => row.title },
        { key: "requester", label: "Solicitante", render: (row) => typeof row.requester === "object" ? (row.requester as { name?: string }).name || "-" : row.requester },
        { key: "priority", label: "Prioridade", render: (row) => <StatusChip label={row.priority || "LOW"} variantcolor={getPriorityColor(row.priority)} size="small" /> },
        { key: "status", label: "Status", render: (row) => <StatusChip label={row.status || "OPEN"} variantcolor={getStatusColor(row.status)} size="small" /> }
    ];

    const rowActions: RowAction<TicketModelType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    return (
        <FullTable
            onPaginationChange={() => {}}
            totalCount={tickets.length}
            limit={tickets.length || 10}
            chipName="chamados"
            title="Chamados TI"
            rowActions={rowActions}
            columns={columns}
            data={tickets}
            page={1}
        />
    );
};

export default TicketTable;