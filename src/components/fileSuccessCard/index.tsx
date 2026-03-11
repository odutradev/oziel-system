import { CheckCircle, Description, Image as ImageIcon, InsertDriveFile, PictureAsPdf } from '@mui/icons-material';
import { Box, Button, CardContent, Typography } from '@mui/material';

import { ActionButtonsContainer, IconWrapper, SuccessCardContainer } from './styles';

import type { FileSuccessCardProps } from './types';

const FileSuccessCard = ({ fileName, fileSize, hash, onNext, onBack }: FileSuccessCardProps) => {
  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext || '')) return <ImageIcon fontSize="large" />;
    if (ext === 'pdf') return <PictureAsPdf fontSize="large" />;
    if (['doc', 'docx'].includes(ext || '')) return <Description fontSize="large" />;
    return <InsertDriveFile fontSize="large" />;
  };

  return (
    <SuccessCardContainer elevation={0} variant="outlined">
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Arquivo armazenado com sucesso!
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 2, p: 2, bgcolor: 'action.hover', borderRadius: 2, width: '100%', maxWidth: 500 }}>
          <IconWrapper>{getFileIcon(fileName)}</IconWrapper>
          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography variant="body1" fontWeight={500} noWrap title={fileName}>
              {fileName}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {(fileSize / 1024 / 1024).toFixed(2)} MB
              {hash && ` • Hash: ${hash.substring(0, 8)}...`}
            </Typography>
          </Box>
        </Box>

        <ActionButtonsContainer>
          {onBack && (
            <Button variant="outlined" size="large" onClick={onBack} sx={{ minWidth: 150 }}>
              Voltar
            </Button>
          )}
          {onNext && (
            <Button variant="contained" size="large" onClick={onNext} sx={{ minWidth: 200 }}>
              Próxima Etapa
            </Button>
          )}
        </ActionButtonsContainer>
      </CardContent>
    </SuccessCardContainer>
  );
};

export default FileSuccessCard;