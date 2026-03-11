import { CloudUpload } from '@mui/icons-material';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

import FileSuccessCard from '../fileSuccessCard';
import { HiddenInput, UploadBox } from './styles';
import type { FileUploadZoneProps } from './types';

const FileUploadZone = ({ accept, maxSize = 50 * 1024 * 1024, onFileSelect, uploading = false, progress = 0, uploadedFile, acceptedFormatsDescription }: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
  }, []);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) return `Arquivo muito grande. Máximo: ${(maxSize / 1024 / 1024).toFixed(0)}MB`;
    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      const isAccepted = acceptedTypes.some(type => type.startsWith('.') ? fileExtension === type.toLowerCase() : file.type.match(new RegExp(type.replace('*', '.*'))));
      if (!isAccepted) return 'Tipo de arquivo não permitido';
    }
    return null;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const err = validateFile(file);
      if (err) setError(err);
      else { setError(null); onFileSelect(file); }
    }
  }, [accept, maxSize, onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const err = validateFile(file);
      if (err) setError(err);
      else { setError(null); onFileSelect(file); }
    }
  }, [accept, maxSize, onFileSelect]);

  if (uploadedFile) {
    return <FileSuccessCard fileName={uploadedFile.name} fileSize={uploadedFile.size} hash={uploadedFile.hash} />;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <UploadBox
        isDragging={isDragging}
        hasError={!!error}
        onClick={() => !uploading && document.getElementById('file-input-zone')?.click()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CloudUpload sx={{ fontSize: 64, mb: 2, opacity: 0.5, color: isDragging ? 'primary.main' : 'text.disabled' }} />
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
          {uploading ? 'Armazenando arquivo...' : 'Arraste ou clique para selecionar'}
        </Typography>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1, border: '1px dashed', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary" component="div" sx={{ lineHeight: 1.6 }}>
            <strong>Formatos aceitos:</strong> {acceptedFormatsDescription || 'Imagens (PNG, JPEG, WEBP), PDF, Word (DOC, DOCX) e Texto (TXT)'}
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div">
            <strong>Tamanho máximo:</strong> {(maxSize / 1024 / 1024).toFixed(0)} MB
          </Typography>
        </Box>

        <HiddenInput id="file-input-zone" type="file" accept={accept} onChange={handleFileInput} disabled={uploading} />
      </UploadBox>

      {uploading && (
        <Box sx={{ mt: 3 }}>
          <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block', textAlign: 'center' }}>
            Processando... {progress}%
          </Typography>
        </Box>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center', fontWeight: 500 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUploadZone;