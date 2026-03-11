import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Slider, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import type { ImageCropDialogProps } from './types';

const ImageCropDialog = ({ open, imageUrl, onClose, onConfirm }: ImageCropDialogProps) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageUrl || !open) return;

    const img = new Image();
    img.onload = () => {
      imageRef.current = img;
      drawImage();
    };
    img.src = imageUrl;
  }, [imageUrl, open]);

  useEffect(() => {
    drawImage();
  }, [zoom, rotation, position]);

  const drawImage = () => {
    if (!canvasRef.current || !imageRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasSize = 400;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.save();
    ctx.translate(canvasSize / 2 + position.x, canvasSize / 2 + position.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    const img = imageRef.current;
    const scale = Math.min(canvasSize / img.width, canvasSize / img.height);
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    ctx.drawImage(img, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
    ctx.restore();

    ctx.strokeStyle = '#0499C8';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvasSize, canvasSize);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleRotateLeft = () => {
    setRotation((prev) => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation((prev) => prev + 90);
  };

  const handleConfirm = async () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'profile.png', { type: 'image/png' });
        onConfirm(file);
      }
    }, 'image/png');
  };

  const handleCancel = () => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Ajustar Imagem</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />

          <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ZoomOutIcon fontSize="small" />
              <Slider
                value={zoom}
                onChange={(_, value) => setZoom(value as number)}
                min={0.5}
                max={3}
                step={0.1}
                sx={{ flex: 1 }}
              />
              <ZoomInIcon fontSize="small" />
              <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right' }}>
                {Math.round(zoom * 100)}%
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RotateLeftIcon />}
                onClick={handleRotateLeft}
              >
                Girar
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RotateRightIcon />}
                onClick={handleRotateRight}
              >
                Girar
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropDialog;