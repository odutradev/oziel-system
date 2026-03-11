import { Box, Typography, Chip, Stack } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { toast } from 'react-toastify';

import MarkdownEditor from '@components/markdownEditor';
import EditSection from '@components/editSection';

import type { EmailBodyProps } from './types';

const EmailBody = ({ formData, onBodyChange }: EmailBodyProps) => {
  const handleCopy = (variable: string) => {
    const text = `{{${variable}}}`;
    navigator.clipboard.writeText(text);
    toast.success('Variável copiada!', { autoClose: 1500, hideProgressBar: true });
  };

  return (
    <EditSection title="Conteúdo">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Variáveis Disponíveis
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {formData.variables?.length ? (
              formData.variables.map((variable) => (
                <Chip
                  key={variable}
                  label={`{{${variable}}}`}
                  size="small"
                  variant="outlined"
                  onClick={() => handleCopy(variable)}
                  onDelete={() => handleCopy(variable)}
                  deleteIcon={<ContentCopy sx={{ fontSize: 16 }} />}
                  sx={{ fontFamily: 'monospace', cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                />
              ))
            ) : (
              <Typography variant="caption" color="text.secondary">
                Nenhuma variável definida
              </Typography>
            )}
          </Stack>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <MarkdownEditor
            value={formData.markdownBody || ''}
            onChange={onBodyChange}
            height={500}
          />
        </Box>
      </Box>
    </EditSection>
  );
};

export default EmailBody;