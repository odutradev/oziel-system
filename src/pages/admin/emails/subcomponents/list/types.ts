import type { EmailTemplateModelType } from "@actions/emails/types";
import type { PaginationMeta } from "@utils/types/action";

export interface EmailListProps {
  data: EmailTemplateModelType[];
  meta: PaginationMeta;
  loading: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearch: (term: string) => void;
  onEdit: (template: EmailTemplateModelType) => void;
  onSeed: () => void;
  onBulkSend: () => void;
  onCreate: () => void;
}