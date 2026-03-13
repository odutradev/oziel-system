import { CheckCircle, Edit, Delete } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { formatCurrency, formatDate } from "@utils/formatters";
import { StatusChip, TypeChip } from "./styles";
import FullTable from "@components/fullTable";

import type { TransactionModelType } from "@utils/types/models/transaction";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { TransactionTableProps } from "./types";

const TransactionTable = ({ transactions, meta, onPaginationChange, onEdit, onDelete, onConfirm }: TransactionTableProps) => {
    const columns: TableColumn<TransactionModelType>[] = [
        { key: "title", label: "Descrição" },
        { key: "date", label: "Data", render: (row) => formatDate(row.date) },
        { key: "amount", label: "Valor", render: (row) => <Typography color={row.type === "INCOME" ? "success.main" : "error.main"} fontWeight={600}>{formatCurrency(row.amount)}</Typography> },
        { key: "type", label: "Tipo", render: (row) => <TypeChip label={row.type === "INCOME" ? "Entrada" : "Saída"} varianttype={row.type} size="small" /> },
        { key: "status", label: "Status", render: (row) => <StatusChip label={row.status === "CONFIRMED" ? "Confirmado" : "Pendente"} variantcolor={row.status === "CONFIRMED" ? "success" : "warning"} size="small" /> }
    ];

    const rowActions: RowAction<TransactionModelType>[] = [
        { label: "Confirmar", icon: <CheckCircle color="success" fontSize="small" />, onClick: (row) => row._id && onConfirm(row._id), show: (row) => row.status === "PENDING", isInline: true },
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    return (
        <FullTable
            data={transactions}
            columns={columns}
            totalCount={meta.total}
            page={meta.page}
            limit={meta.limit}
            onPaginationChange={onPaginationChange}
            rowActions={rowActions}
            title="Transações"
            chipName="transações"
        />
    );
};

export default TransactionTable;