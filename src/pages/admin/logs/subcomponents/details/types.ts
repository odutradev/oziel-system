import type { LogEntry } from '@actions/logs/types';

export interface LogDetailsProps {
  log: LogEntry | null;
  onClose: () => void;
}