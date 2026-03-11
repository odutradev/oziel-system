import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';

import { formatUser } from '../list/utils';

import type { LogDetailsProps } from './types';

const LogDetails = ({ log, onClose }: LogDetailsProps) => {
  const renderDetailItem = (label: string, value: string | undefined, monospace = false) => (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={monospace ? { fontFamily: 'monospace' } : {}}>
        {value || '-'}
      </Typography>
    </Box>
  );

  const renderJsonBlock = (label: string, data: any) => {
    if (!data) return null;
    return (
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Box
          component="pre"
          sx={{
            p: 2,
            bgcolor: 'action.hover',
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
          }}
        >
          {JSON.stringify(data, null, 2)}
        </Box>
      </Box>
    );
  };

  return (
    <Dialog open={!!log} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalhes do Log</DialogTitle>
      <DialogContent>
        {log && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            {renderDetailItem('Data/Hora', new Date(log.timestamp || log.date || '').toLocaleString('pt-BR'), true)}
            {renderDetailItem('Ação', log.action)}
            {renderDetailItem('Entidade', log.entity)}
            {renderDetailItem('ID da Entidade', log.entityID, true)}
            {renderDetailItem('Usuário', formatUser(log.userID), true)}
            {renderDetailItem('Descrição', log.description)}

            {log.userID && typeof log.userID === 'object' && renderJsonBlock('Dados do Usuário', log.userID)}
            {renderJsonBlock('Metadados', log.metadata)}
            {renderJsonBlock('Payload', log.payload)}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogDetails;