import { Edit, Delete, Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

import ToggleGroup from "@components/toggleGroup";
import FullTable from "@components/fullTable";
import { StatusChip } from "./styles";

import type { TableColumn, RowAction } from "@components/fullTable/types";
import type { ResourceTableProps } from "./types";
import type { ResourceItemType } from "../../types";

const TAB_OPTIONS = [
    { value: "assets", label: "Ativos" },
    { value: "operators", label: "Operadores" }
];

const ResourceTable = ({ items, meta, activeTab, loading, onTabChange, onPaginationChange, onEdit, onCreate, onDelete }: ResourceTableProps) => {
    const isAsset = activeTab === "assets";

    const columns: TableColumn<ResourceItemType>[] = [
        { key: "name", label: isAsset ? "Nome do Ativo" : "Nome do Operador" },
        {
            key: isAsset ? "description" : "document",
            label: isAsset ? "Descrição" : "Documento",
            render: (row) => {
                if (isAsset && "description" in row) return row.description || "-";
                if (!isAsset && "document" in row) return row.document || "-";
                return "-";
            }
        },
        {
            key: "active",
            label: "Status",
            render: (row) => <StatusChip label={row.active ? "Ativo" : "Inativo"} variantactive={String(row.active)} size="small" />
        }
    ];

    const rowActions: RowAction<ResourceItemType>[] = [
        { label: "Editar", icon: <Edit fontSize="small" />, onClick: onEdit },
        { label: "Excluir", icon: <Delete fontSize="small" />, onClick: (row) => row._id && onDelete(row._id) }
    ];

    const headerContent = (
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
            <Box sx={{ minWidth: 280 }}>
                <ToggleGroup
                    onChange={onTabChange}
                    options={TAB_OPTIONS}
                    value={activeTab}
                    size="small"
                />
            </Box>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={onCreate} sx={{ whiteSpace: "nowrap", height: 40 }}>
                {isAsset ? "Novo Ativo" : "Novo Operador"}
            </Button>
        </Box>
    );

    return (
        <FullTable
            title={isAsset ? "Ativos Cadastrados" : "Operadores Cadastrados"}
            onPaginationChange={onPaginationChange}
            chipName={isAsset ? "ativos" : "operadores"}
            headerContent={headerContent}
            rowActions={rowActions}
            totalCount={meta.total}
            onRowClick={onEdit}
            columns={columns}
            limit={meta.limit}
            loading={loading}
            page={meta.page}
            data={items}
        />
    );
};

export default ResourceTable;