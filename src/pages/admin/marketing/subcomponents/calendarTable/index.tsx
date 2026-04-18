import { Edit, Send, RateReview } from "@mui/icons-material";

import { TableContainer, StatusChip } from "./styles";
import { STATUS_TRANSLATIONS } from "../../types";
import { formatDate } from "@utils/formatters";
import FullTable from "@components/fullTable";

import type { MarketingItemModelType, MarketingStatus } from "@actions/marketingRequests/types";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { CalendarTableProps } from "./types";

const getStatusColor = (status: MarketingStatus) => {
    const map: Record<MarketingStatus, "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = {
        REVISION_REQUIRED: "error",
        WAITING_APPROVAL: "warning",
        COMPLETED: "success",
        APPROVED: "success",
        PLANNED: "info",
        DRAFT: "default"
    };
    return map[status] || "default";
};

const CalendarTable = ({ items, onEdit, onSendApproval, onReview }: CalendarTableProps) => {
    const columns: TableColumn<MarketingItemModelType>[] = [
        { key: "plannedDate", label: "Data Planejada", render: (row) => row.plannedDate ? formatDate(row.plannedDate as string) : "-" },
        { key: "title", label: "Campanha/Post", render: (row) => row.title },
        { key: "status", label: "Status", render: (row) => <StatusChip label={STATUS_TRANSLATIONS[row.status] || row.status} variantcolor={getStatusColor(row.status)} size="small" /> },
        { key: "requester", label: "Solicitante", render: (row) => row.requester?.name || "-" }
    ];

    const rowActions: RowAction<MarketingItemModelType>[] = [
        { label: "Enviar Aprovação", icon: <Send color="primary" fontSize="small" />, onClick: (row) => row._id && onSendApproval(row._id), show: (row) => row.status === "PLANNED" || row.status === "REVISION_REQUIRED", isInline: true },
        { label: "Revisar", icon: <RateReview color="warning" fontSize="small" />, onClick: onReview, show: (row) => row.status === "WAITING_APPROVAL", isInline: true },
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit, show: (row) => row.status !== "APPROVED" && row.status !== "COMPLETED" }
    ];

    return (
        <TableContainer>
            <FullTable
                onPaginationChange={() => {}}
                limit={items.length || 10}
                totalCount={items.length}
                title="Agenda de Marketing"
                chipName="itens"
                rowActions={rowActions}
                columns={columns}
                data={items}
                page={1}
            />
        </TableContainer>
    );
};

export default CalendarTable;