import type { UserModelType } from "@utils/types/models/user";
import type { PaginationMeta } from '@utils/types/action';

export interface UserListProps {
  data: UserModelType[];
  meta: PaginationMeta;
  loading: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearch: (term: string) => void;
  onEdit: (user: UserModelType) => void;
}