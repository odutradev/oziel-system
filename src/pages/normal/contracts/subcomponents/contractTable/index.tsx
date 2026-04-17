import { Edit, Delete, Add } from "@mui/icons-material";
import { Button } from "@mui/material";

import { CONTRACT_TYPE_TRANSLATIONS, CONTRACT_STATUS_TRANSLATIONS, ContractModelType, ContractStatusType } from "@utils/types/models/contract";
import { formatCurrency, formatDate } from "@utils/formatters";
import FullTable from "@components/fullTable";
import { StatusChip } from "./styles";

import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { ContractTableProps } from "./types";

const getStatusColor = (status?: ContractStatusType) => {
    if (status === "ACTIVE") return "success";
    if (status === "REGULAR") return "info";
    if (status === "IRREGULAR") return "warning";
    if (status === "INACTIVE") return "error";
    return "default";
};

const ContractTable = ({ contracts, meta, onEdit, onDelete, onPaginationChange, onCreate }: ContractTableProps) => {
    const columns: TableColumn<ContractModelType>[] = [
        { key: "code", label: "Código", render: (row) => row.code },
        { key: "type", label: "Tipo", render: (row) => CONTRACT_TYPE_TRANSLATIONS[row.type] },
        { key: "contractDate", label: "Data", render: (row) => formatDate(row.contractDate as string) },
        { key: "deliveryForecast", label: "Previsão", render: (row) => formatDate(row.deliveryForecast as string) },
        { key: "totalValue", label: "Valor Total", render: (row) => formatCurrency(row.totalValue) },
        { key: "status", label: "Status", render: (row) => <StatusChip label={CONTRACT_STATUS_TRANSLATIONS[row.status]} variantcolor={getStatusColor(row.status)} size="small" /> }
    ];

    const rowActions: RowAction<ContractModelType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    const headerAction = (
        <Button variant="contained" color="primary" startIcon={<Add />} onClick={onCreate} size="small">
            Novo Contrato
        </Button>
    );

    return (
        <FullTable
            data={contracts}
            columns={columns}
            totalCount={meta.total}
            page={meta.page}
            limit={meta.limit}
            onPaginationChange={onPaginationChange}
            rowActions={rowActions}
            onRowClick={onEdit}
            title="Contratos"
            chipName="contratos"
            headerContent={headerAction}
        />
    );
};

export default ContractTable;