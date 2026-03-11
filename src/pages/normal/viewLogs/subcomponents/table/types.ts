import type { PaginationMeta } from "@utils/types/action";
import type { LogEntry } from "@actions/logs/types";

export interface LogsTableProps {
  onSearch: (term: string) => void;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  meta: PaginationMeta;
  loading: boolean;
  data: LogEntry[];
  limit: number;
  page: number;
}
