import type { UserModelType } from '@utils/types/models/user';

export interface WelcomeHeaderProps {
  user: Partial<UserModelType> | null;
}