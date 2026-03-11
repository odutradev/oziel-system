import type { UserModelType } from '@utils/types/models/user';

export interface AccountStatusProps {
  user: Partial<UserModelType> | null;
}