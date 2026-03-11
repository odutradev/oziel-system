import type { AvatarProps } from '@mui/material/Avatar';

export interface ProfileAvatarProps extends Pick<AvatarProps, 'variant'> {
  imageUrl?: string;
  text: string;
  size?: number;
  textSize?: number;
  fontWeight?: number;
}