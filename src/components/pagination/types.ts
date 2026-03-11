export interface PaginationProps {
    totalItems: number
    currentPage: number
    rowsPerPage: number
    onPaginationChange: (pagination: { currentPage: number; rows: number }) => void
  }
  