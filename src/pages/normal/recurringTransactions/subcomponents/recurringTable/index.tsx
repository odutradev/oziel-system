import { Edit, Delete } from "@mui/icons-material";
import { Typography } from "@mui/material";

import { formatCurrency, formatDate } from "@utils/formatters";
import FullTable from "@components/fullTable";
import { StatusChip, TypeChip } from "./styles";

import type { RecurringTransactionModelType } from "@utils/types/models/recurringTransaction";
import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { RecurringTableProps } from "./types";

const FREQUENCY_MAP: Record<string, string> = { DAILY: "Diário", WEEKLY: "Semanal", MONTHLY: "Mensal", YEARLY: "Anual", CUSTOM_DAYS: "Personalizado" };

const RecurringTable = ({ transactions, meta, onPaginationChange, onEdit, onDelete }: RecurringTableProps) => {
    const columns: TableColumn<RecurringTransactionModelType>[] = [
        { key: "title", label: "Descrição" },
        { key: "amount", label: "Valor", render: (row) => <Typography color={row.type === "INCOME" ? "success.main" : "error.main"} fontWeight={600}>{formatCurrency(row.amount)}</Typography> },
        { key: "type", label: "Tipo", render: (row) => <TypeChip label={row.type === "INCOME" ? "Entrada" : "Saída"} varianttype={row.type} size="small" /> },
        { key: "frequency", label: "Frequência", render: (row) => FREQUENCY_MAP[row.frequency] || row.frequency },
        { key: "nextExecution", label: "Próxima Exec.", render: (row) => formatDate(row.nextExecution) },
        { key: "active", label: "Status", render: (row) => <StatusChip label={row.active ? "Ativo" : "Pausado"} variantactive={row.active ?? false} size="small" /> }
    ];

    const rowActions: RowAction<RecurringTransactionModelType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    return <FullTable data={transactions} columns={columns} totalCount={meta.total} page={meta.page} limit={meta.limit} onPaginationChange={onPaginationChange} rowActions={rowActions} title="Agendamentos" chipName="agendamentos" />;
};

export default RecurringTable;