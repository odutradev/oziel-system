import { Edit, Delete } from "@mui/icons-material";

import FullTable from "@components/fullTable";
import { StatusChip } from "./styles";

import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { FleetModelType } from "@actions/fleets/types";
import type { FleetsTableProps } from "./types";

const FleetsTable = ({ fleets, meta, onPaginationChange, onEdit, onDelete }: FleetsTableProps) => {
    const columns: TableColumn<FleetModelType>[] = [
        { key: "name", label: "Nome da Frota" },
        { key: "description", label: "Descrição", render: (row) => row.description || "-" },
        { key: "active", label: "Status", render: (row) => <StatusChip label={row.active ? "Ativa" : "Inativa"} variantactive={String(row.active)} size="small" /> }
    ];

    const rowActions: RowAction<FleetModelType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    return (
        <FullTable
            data={fleets}
            columns={columns}
            totalCount={meta.total}
            page={meta.page}
            limit={meta.limit}
            onPaginationChange={onPaginationChange}
            rowActions={rowActions}
            title="Frotas Cadastradas"
            chipName="frotas"
        />
    );
};

export default FleetsTable;