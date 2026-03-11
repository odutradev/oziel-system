export interface ImageCropDialogProps {
  open: boolean;
  imageUrl: string;
  onClose: () => void;
  onConfirm: (file: File) => void;
}