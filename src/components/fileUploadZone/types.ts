export interface UploadedFileInfo {
  name: string;
  size: number;
  mimeType: string;
  hash?: string;
}

export interface FileUploadZoneProps {
  accept?: string;
  maxSize?: number;
  onFileSelect: (file: File) => void;
  uploading?: boolean;
  progress?: number;
  uploadedFile?: UploadedFileInfo | null;
  acceptedFormatsDescription?: string;
}