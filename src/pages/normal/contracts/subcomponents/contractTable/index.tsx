import { Edit, Delete } from "@mui/icons-material";

import { formatCurrency, formatDate } from "@utils/formatters";
import FullTable from "@components/fullTable";
import { StatusChip } from "./styles";

import type { ContractModelType, ContractStatusType } from "@utils/types/models/contract";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { ContractTableProps } from "./types";

const getStatusColor = (status?: ContractStatusType) => {
    if (status === "ACTIVE") return "success";
    if (status === "REGULAR") return "info";
    if (status === "IRREGULAR") return "warning";
    if (status === "INACTIVE") return "error";
    return "default";
};

const getStatusLabel = (status?: ContractStatusType) => {
    if (status === "ACTIVE") return "Ativo";
    if (status === "REGULAR") return "Regular";
    if (status === "IRREGULAR") return "Irregular";
    if (status === "INACTIVE") return "Inativo";
    return "Pendente";
};

const ContractTable = ({ contracts, onEdit, onDelete }: ContractTableProps) => {
    const columns: TableColumn<ContractModelType>[] = [
        { key: "code", label: "Código", render: (row) => row.code },
        { key: "type", label: "Tipo", render: (row) => row.type },
        { key: "contractDate", label: "Data Contrato", render: (row) => formatDate(row.contractDate as string) },
        { key: "deliveryForecast", label: "Previsão", render: (row) => formatDate(row.deliveryForecast as string) },
        { key: "totalValue", label: "Valor Total", render: (row) => formatCurrency(row.totalValue) },
        { key: "status", label: "Status", render: (row) => <StatusChip label={getStatusLabel(row.status)} variantcolor={getStatusColor(row.status)} size="small" /> }
    ];

    const rowActions: RowAction<ContractModelType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    return (
        <FullTable
            onPaginationChange={() => {}}
            totalCount={contracts.length}
            limit={contracts.length || 10}
            rowActions={rowActions}
            chipName="contratos"
            columns={columns}
            title="Contratos"
            data={contracts}
            page={1}
        />
    );
};

export default ContractTable;