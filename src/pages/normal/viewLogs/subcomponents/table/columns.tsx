import { Typography } from "@mui/material";

import { MonospaceText } from "./styles";
import { formatLogDate } from "./utils";

import type { TableColumn } from "@components/fullTable/types";
import type { LogEntry } from "@actions/logs/types";

export const logsColumns: TableColumn<LogEntry>[] = [
  {
    key: "description",
    label: "Descrição",
    render: (log) => <Typography variant="body2">{log.description || "N/A"}</Typography>,
  },
  {
    key: "timestamp",
    label: "Data",
    render: (log) => <Typography variant="body2">{formatLogDate(log.timestamp)}</Typography>,
  },
  {
    key: "metadata.ip",
    label: "IP",
    render: (log) => <MonospaceText variant="body2">{log.metadata?.ip || "N/A"}</MonospaceText>,
  },
];
