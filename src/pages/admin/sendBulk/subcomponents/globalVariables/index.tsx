import { CardContent, Typography, TextField, Button, Stack, Chip } from '@mui/material';
import { useState } from 'react';

import { StyledCard, InputRow } from './styles';

import type { GlobalVariablesProps } from './types';

const GlobalVariables = ({ variables, onAddVariable, onRemoveVariable }: GlobalVariablesProps) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!key.trim() || !value.trim()) return;
    onAddVariable(key.trim(), value.trim());
    setKey('');
    setValue('');
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Variáveis Globais
        </Typography>

        <InputRow>
          <TextField
            size="small"
            label="Nome"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            sx={{ flex: 1 }}
          />
          <TextField
            size="small"
            label="Valor"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            sx={{ flex: 1 }}
          />
          <Button variant="outlined" onClick={handleAdd}>
            Adicionar
          </Button>
        </InputRow>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {Object.entries(variables).map(([k, v]) => (
            <Chip
              key={k}
              label={`${k}: ${v}`}
              onDelete={() => onRemoveVariable(k)}
              size="small"
            />
          ))}
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default GlobalVariables;