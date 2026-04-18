import { Edit, Delete, EventAvailable, Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

import { TableContainer, TableHeader } from "./styles";
import FullTable from "@components/fullTable";

import type { MarketingItemModelType } from "@actions/marketingRequests/types";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { DraftsTableProps } from "./types";

const DraftsTable = ({ drafts, onEdit, onSchedule, onDelete, onNew }: DraftsTableProps) => {
    const columns: TableColumn<MarketingItemModelType>[] = [
        { key: "title", label: "Título da Campanha/Post", render: (row) => row.title },
        { key: "description", label: "Descrição Inicial", render: (row) => row.description },
        { key: "requester", label: "Solicitante", render: (row) => row.requester?.name || "-" }
    ];

    const rowActions: RowAction<MarketingItemModelType>[] = [
        { label: "Agendar", icon: <EventAvailable color="primary" fontSize="small" />, onClick: (row) => row._id && onSchedule(row._id), isInline: true },
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    return (
        <TableContainer>
            <TableHeader>
                <Typography variant="h6" fontWeight={600}>Ideias em Rascunho</Typography>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={onNew}>Novo Rascunho</Button>
            </TableHeader>
            <FullTable
                onPaginationChange={() => void 0}
                limit={drafts.length || 10}
                totalCount={drafts.length}
                chipName="rascunhos"
                rowActions={rowActions}
                columns={columns}
                data={drafts}
                page={1}
            />
        </TableContainer>
    );
};

export default DraftsTable;