import { CheckCircle, Edit, Delete } from "@mui/icons-material";

import { formatCurrency, formatDate } from "@utils/formatters";
import FullTable from "@components/fullTable";
import { StatusChip } from "./styles";

import type { MachineOperationStatusType, MachineOperationModelType } from "@actions/machineOperations/types";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { OperatorModelType } from "@actions/operators/types";
import type { AssetModelType } from "@actions/assets/types";
import type { OperationTableProps } from "./types";

const OperationTable = ({ operations, operators, assets, onEdit, onDelete, onStatusChange }: OperationTableProps) => {
    const columns: TableColumn<MachineOperationModelType>[] = [
        { key: "operationDate", label: "Data", render: (row) => formatDate(row.operationDate) },
        { key: "operator", label: "Operador", render: (row) => typeof row.operator === "object" ? (row.operator as OperatorModelType).name : (operators.find(o => o._id === row.operator)?.name || "-") },
        { key: "asset", label: "Ativo", render: (row) => typeof row.asset === "object" ? (row.asset as AssetModelType).name : (assets.find(a => a._id === row.asset)?.name || "-") },
        { key: "hourlyRate", label: "Valor Hora", render: (row) => formatCurrency(row.hourlyRate) },
        { key: "status", label: "Status", render: (row) => <StatusChip label={row.status === "COMPLETED" ? "Concluída" : "Pendente"} variantcolor={row.status === "COMPLETED" ? "success" : "warning"} size="small" /> }
    ];

    const rowActions: RowAction<MachineOperationModelType>[] = [
        { label: "Concluir", icon: <CheckCircle color="success" fontSize="small" />, onClick: (row) => row._id && onStatusChange(row._id, "COMPLETED" as MachineOperationStatusType), show: (row) => row.status !== "COMPLETED", isInline: true },
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    return (
        <FullTable
            onPaginationChange={() => {}}
            limit={operations.length || 10}
            totalCount={operations.length}
            title="Operações do Mês"
            chipName="operações"
            rowActions={rowActions}
            columns={columns}
            data={operations}
            page={1}
        />
    );
};

export default OperationTable;