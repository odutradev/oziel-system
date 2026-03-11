import type { LogEntry } from '@actions/logs/types';
import type { PaginationMeta } from '@utils/types/action';

export interface LogsListProps {
  data: LogEntry[];
  meta: PaginationMeta;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearch: (term: string) => void;
  onViewDetails: (log: LogEntry) => void;
}