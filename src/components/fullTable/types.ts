import type { ReactNode } from "react";

export interface TableColumn<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => ReactNode;
    align?: "left" | "right" | "center";
}

export interface RowAction<T> {
    label: string;
    onClick: (row: T) => void;
    show?: (row: T) => boolean;
    icon?: ReactNode;
    isInline?: boolean;
}

export interface FullTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    title?: string;
    chipName?: string;
    totalCount: number;
    page: number;
    limit: number;
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void;
    onSearch?: (value: string) => void;
    showActions?: boolean;
    showPagination?: boolean;
    availableLimits?: number[];
    rowActions?: RowAction<T>[];
    onRowClick?: (row: T) => void;
    headerContent?: ReactNode;
    loading?: boolean;
}