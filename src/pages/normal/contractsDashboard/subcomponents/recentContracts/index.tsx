import { Box, Typography } from "@mui/material";

import { CONTRACT_STATUS_TRANSLATIONS, CONTRACT_TYPE_TRANSLATIONS } from "@utils/types/models/contract";
import { formatCurrency, formatDate } from "@utils/formatters";
import FullTable from "@components/fullTable";

import type { TableColumn } from "@components/fullTable/types";
import type { ContractModelType } from "@utils/types/models/contract";
import type { RecentContractsProps } from "./types";

const RecentContracts = ({ contracts }: RecentContractsProps) => {
    if (!contracts || contracts.length === 0) return null;

    const columns: TableColumn<ContractModelType>[] = [
        { key: "code", label: "Código", render: (item) => <Typography fontWeight={600} variant="body2">{item.code}</Typography> },
        { key: "type", label: "Tipo", render: (item) => CONTRACT_TYPE_TRANSLATIONS[item.type] },
        { key: "status", label: "Status", render: (item) => CONTRACT_STATUS_TRANSLATIONS[item.status] },
        { key: "contractDate", label: "Data", render: (item) => formatDate(item.contractDate as string) },
        { key: "totalValue", label: "Custo", render: (item) => formatCurrency(item.totalValue) },
        { key: "totalSalePrice", label: "Venda", render: (item) => <Typography fontWeight={600} color="primary.main" variant="body2">{formatCurrency(item.totalSalePrice)}</Typography> }
    ];

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <FullTable
                data={contracts}
                columns={columns}
                title="Contratos Recentes (Período Selecionado)"
                totalCount={contracts.length}
                page={1}
                limit={10}
                showActions={false}
                showPagination={false}
                onPaginationChange={() => {}}
            />
        </Box>
    );
};

export default RecentContracts;