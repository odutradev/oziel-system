import { Chip, Typography } from '@mui/material';

import { getActionColor, formatUser } from './utils';

import type { LogEntry } from '@actions/logs/types';
import type { TableColumn } from '@components/fullTable/types';

export const columns: TableColumn<LogEntry>[] = [
  {
    key: 'timestamp',
    label: 'Data/Hora',
    render: (log) => (
      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
        {new Date(log.timestamp || log.date || '').toLocaleString('pt-BR')}
      </Typography>
    ),
  },
  {
    key: 'action',
    label: 'Ação',
    render: (log) => (
      <Chip
        label={log.action}
        size="small"
        color={getActionColor(log.action || '') as any}
        sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}
      />
    ),
  },
  {
    key: 'entity',
    label: 'Entidade',
    render: (log) => (
      <Typography variant="body2" fontWeight={500}>
        {log.entity || '-'}
      </Typography>
    ),
  },
  {
    key: 'userID',
    label: 'Usuário',
    render: (log) => (
      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
        {formatUser(log.userID)}
      </Typography>
    ),
  },
  {
    key: 'description',
    label: 'Descrição',
    render: (log) => (
      <Typography variant="body2" noWrap sx={{ maxWidth: 300 }}>
        {log.description || '-'}
      </Typography>
    ),
  },
  {
    key: 'metadata',
    label: 'IP',
    render: (log) => (
      <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
        {log.metadata?.ip || log.ip || '-'}
      </Typography>
    ),
  },
];