import { RateReview, Send, Edit } from "@mui/icons-material";

import FullTable from "@components/fullTable";
import { StatusChip } from "./styles";

import type { MarketingRequestModelType, MarketingRequestStatus } from "@actions/marketingRequests/types";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { RequestTableProps } from "./types";

const getStatusColor = (status: MarketingRequestStatus) => {
    if (status === "APPROVED") return "success";
    if (status === "WAITING_APPROVAL") return "warning";
    if (status === "REVISION_REQUIRED") return "error";
    return "default";
};

const getStatusLabel = (status: MarketingRequestStatus) => {
    if (status === "APPROVED") return "Aprovado";
    if (status === "WAITING_APPROVAL") return "Aguardando";
    if (status === "REVISION_REQUIRED") return "Revisão Necessária";
    return "Solicitado";
};

const RequestTable = ({ requests, onEdit, onReview, onSendApproval }: RequestTableProps) => {
    const columns: TableColumn<MarketingRequestModelType>[] = [
        { key: "title", label: "Título", render: (row) => row.title },
        { key: "requester", label: "Solicitante", render: (row) => typeof row.requester === "object" ? (row.requester as { name?: string }).name || "-" : row.requester },
        { key: "status", label: "Status", render: (row) => <StatusChip label={getStatusLabel(row.status)} variantcolor={getStatusColor(row.status)} size="small" /> }
    ];

    const rowActions: RowAction<MarketingRequestModelType>[] = [
        { label: "Revisar", icon: <RateReview fontSize="small" />, onClick: onReview, show: (row) => row.status === "WAITING_APPROVAL" },
        { label: "Aprovação", icon: <Send fontSize="small" />, onClick: (row) => row._id && onSendApproval(row._id), show: (row) => row.status === "REQUESTED" || row.status === "REVISION_REQUIRED" },
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit }
    ];

    return (
        <FullTable
            onPaginationChange={() => {}}
            totalCount={requests.length}
            limit={requests.length || 10}
            title="Solicitações"
            rowActions={rowActions}
            chipName="marketing"
            columns={columns}
            data={requests}
            page={1}
        />
    );
};

export default RequestTable;