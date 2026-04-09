import { Edit, Delete } from "@mui/icons-material";

import FullTable from "@components/fullTable";
import { StatusChip } from "./styles";

import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { OperatorModelType } from "@actions/operators/types";
import type { OperatorsTableProps } from "./types";

const OperatorsTable = ({ operators, meta, onPaginationChange, onEdit, onDelete }: OperatorsTableProps) => {
    const columns: TableColumn<OperatorModelType>[] = [
        { key: "name", label: "Nome do Operador" },
        { key: "document", label: "Documento", render: (row) => row.document || "-" },
        { key: "active", label: "Status", render: (row) => <StatusChip label={row.active ? "Ativo" : "Inativo"} variantactive={String(row.active)} size="small" /> }
    ];

    const rowActions: RowAction<OperatorModelType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    return (
        <FullTable
            data={operators}
            columns={columns}
            totalCount={meta.total}
            page={meta.page}
            limit={meta.limit}
            onPaginationChange={onPaginationChange}
            rowActions={rowActions}
            title="Operadores Cadastrados"
            chipName="operadores"
        />
    );
};

export default OperatorsTable;