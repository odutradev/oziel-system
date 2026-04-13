import { formatCurrency } from "@utils/formatters";
import FullTable from "@components/fullTable";
import { TableWrapper } from "./styles";

import type { TableColumn } from "@components/fullTable/types";
import type { OperatorTotalsTableProps } from "./types";
import type { OperatorTableRow } from "../../types";

const OperatorTotalsTable = ({ data }: OperatorTotalsTableProps) => {
    const columns: TableColumn<OperatorTableRow>[] = [
        { key: "name", label: "Nome do Operador", render: (row) => row.name },
        { key: "hours", label: "Horas Trabalhadas", render: (row) => `${row.hours.toFixed(2)}h` },
        { key: "revenue", label: "Receita Gerada", render: (row) => formatCurrency(row.revenue) }
    ];

    return (
        <TableWrapper>
            <FullTable
                data={data}
                columns={columns}
                totalCount={data.length}
                page={1}
                limit={data.length || 10}
                onPaginationChange={() => {}}
                title="Resumo Consolidado por Operador"
                chipName="operadores"
            />
        </TableWrapper>
    );
};

export default OperatorTotalsTable;