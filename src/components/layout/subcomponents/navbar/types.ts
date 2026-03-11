import type { BreadcrumbItem } from '@components/layout/types'

export interface LayoutNavbarProps {
  rightComponent?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  padding?: number;
}