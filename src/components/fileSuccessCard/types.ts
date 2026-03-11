export interface FileSuccessCardProps {
  fileName: string;
  fileSize: number;
  hash?: string;
  onNext?: () => void;
  onBack?: () => void;
}