import { formatCurrency } from "@utils/formatters";
import FullTable from "@components/fullTable";
import { TableWrapper } from "./styles";

import type { TableColumn } from "@components/fullTable/types";
import type { DetailsTableProps } from "./types";
import type { DetailTableRow } from "../../types";

const DetailsTable = ({ data }: DetailsTableProps) => {
    const columns: TableColumn<DetailTableRow>[] = [
        { key: "serviceOrder", label: "Ordem de Serviço", render: (row) => String(row.serviceOrder).padStart(4, "0") },
        { key: "operatorName", label: "Operador", render: (row) => row.operatorName },
        { key: "description", label: "Descrição do Serviço", render: (row) => row.description || "-" },
        { key: "hours", label: "Horas", render: (row) => `${(row.hours || 0).toFixed(2)}h` },
        { key: "hourlyRate", label: "Valor/Hora", render: (row) => formatCurrency(row.hourlyRate || 0) },
        { key: "total", label: "Valor Total", render: (row) => formatCurrency(row.total || 0) }
    ];

    return (
        <TableWrapper>
            <FullTable
                data={data}
                columns={columns}
                totalCount={data.length}
                page={1}
                limit={data.length || 50}
                onPaginationChange={() => {}}
                title="Detalhamento Completo de Operações"
                chipName="registros"
            />
        </TableWrapper>
    );
};

export default DetailsTable;