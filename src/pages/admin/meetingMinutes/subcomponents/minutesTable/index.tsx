import { Delete, Edit, Add } from "@mui/icons-material";
import { Button } from "@mui/material";

import FullTable from "@components/fullTable";
import { TableContainer } from "./styles";

import type { MeetingMinuteModelType } from "@utils/types/models/meetingMinute";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { MinutesTableProps } from "./types";

const MinutesTable = ({ setLimit, setPage, minutes, loading, limit, total, page, onEdit, onDelete, onNew }: MinutesTableProps) => {
    const columns: TableColumn<MeetingMinuteModelType>[] = [
        { key: "title", label: "Título da Reunião", render: (row) => row.title },
        { key: "date", label: "Data da Reunião", render: (row) => new Date(row.date).toLocaleDateString("pt-BR") },
        { key: "updatedAt", label: "Última Modificação", render: (row) => new Date(row.updatedAt).toLocaleDateString("pt-BR") },
        { key: "versions", label: "Versões (Histórico)", render: (row) => `${row.history?.length || 0} versão(ões)` }
    ];

    const rowActions: RowAction<MeetingMinuteModelType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit, isInline: true },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    const handlePagination = (pagination: { currentPage: number; rows: number }) => {
        setPage(pagination.currentPage);
        setLimit(pagination.rows);
    };

    return (
        <TableContainer>
            <FullTable
                headerContent={<Button variant="contained" color="primary" startIcon={<Add />} onClick={onNew}>Nova Ata</Button>}
                onPaginationChange={handlePagination}
                rowActions={rowActions}
                chipName="atas"
                totalCount={total}
                onRowClick={onEdit}
                columns={columns}
                loading={loading}
                data={minutes}
                limit={limit}
                page={page}
            />
        </TableContainer>
    );
};

export default MinutesTable;