import { Edit, Delete, Add } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";

import { TableContainerWrapper } from "./styles";
import FullTable from "@components/fullTable";

import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { HrMemberModelType } from "@actions/hrMembers/types";
import type { MembersTableProps } from "./types";

const MembersTable = ({ members, meta, onPaginationChange, onEdit, onDelete, onCreate }: MembersTableProps) => {
    const columns: TableColumn<HrMemberModelType>[] = [
        { key: "name", label: "Nome", render: (row) => <Typography variant="body2" fontWeight={500}>{row.name}</Typography> },
        { key: "cpfOrRg", label: "Documento", render: (row) => row.cpfOrRg || "-" },
        { key: "email", label: "Email", render: (row) => row.email || "-" },
        { key: "phone", label: "Telefone", render: (row) => row.hrControl?.phone || "-" }
    ];

    const rowActions: RowAction<HrMemberModelType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    const headerAction = (
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={onCreate} size="small">
            Novo Membro
        </Button>
    );

    return (
        <TableContainerWrapper>
            <FullTable
                data={members}
                columns={columns}
                totalCount={meta.total}
                page={meta.page}
                limit={meta.limit}
                onPaginationChange={onPaginationChange}
                rowActions={rowActions}
                onRowClick={onEdit}
                title="Membros Monitorados (RH)"
                chipName="membros"
                headerContent={headerAction}
            />
        </TableContainerWrapper>
    );
};

export default MembersTable;