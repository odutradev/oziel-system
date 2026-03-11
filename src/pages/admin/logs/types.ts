import type { LogEntry } from '@actions/logs/types';

export interface LogsContextState {
  selectedLog: LogEntry | null;
  searchTerm: string;
}

export interface LogsContextActions {
  setSelectedLog: (log: LogEntry | null) => void;
  setSearchTerm: (term: string) => void;
}