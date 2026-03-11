import { CardContent, Typography, Button, TextField, Stack, Chip } from '@mui/material';
import { Upload } from '@mui/icons-material';
import { useState } from 'react';

import { StyledCard, Header, InputRow, RecipientList } from './styles';

import type { RecipientManagerProps } from './types';
import type { EmailRecipient } from '@actions/emails/types';

const RecipientManager = ({ recipients, onAddRecipient, onRemoveRecipient, onImportRecipients }: RecipientManagerProps) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const email = input.trim();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Email inválido');
      return;
    }

    onAddRecipient(email);
    setInput('');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const newRecipients: EmailRecipient[] = lines.map(line => ({ email: line.trim() }));
      onImportRecipients(newRecipients);
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  return (
    <StyledCard>
      <CardContent>
        <Header>
          <Typography variant="h6">
            Destinatários ({recipients.length})
          </Typography>
          <Button
            variant="outlined"
            size="small"
            component="label"
            startIcon={<Upload />}
          >
            Importar CSV
            <input type="file" hidden accept=".csv,.txt" onChange={handleImport} />
          </Button>
        </Header>

        <InputRow>
          <TextField
            size="small"
            label="Email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            fullWidth
          />
          <Button variant="outlined" onClick={handleAdd}>
            Adicionar
          </Button>
        </InputRow>

        <RecipientList>
          <Stack spacing={0.5}>
            {recipients.map((recipient) => (
              <Chip
                key={recipient.email}
                label={recipient.email}
                onDelete={() => onRemoveRecipient(recipient.email)}
                size="small"
                sx={{ justifyContent: 'space-between' }}
              />
            ))}
          </Stack>
        </RecipientList>
      </CardContent>
    </StyledCard>
  );
};

export default RecipientManager;