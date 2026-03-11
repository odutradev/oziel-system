import { CardContent, Typography, TextField } from '@mui/material';

import { StyledCard } from './styles';

import type { TemplateConfigProps } from './types';

const TemplateConfig = ({ trigger, onTriggerChange }: TemplateConfigProps) => {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Configuração do Template
        </Typography>
        <TextField
          label="Trigger do Template"
          value={trigger}
          onChange={(e) => onTriggerChange(e.target.value)}
          fullWidth
          required
          helperText="Ex: WELCOME, PASSWORD_RESET, BULK_EMAIL"
        />
      </CardContent>
    </StyledCard>
  );
};

export default TemplateConfig;