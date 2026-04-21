import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import type { RoleType } from '@utils/types/models/user';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface LayoutProps {
  navbarComponent?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  disableGetUser?: boolean;
  pageTitle?: string;
  loading?: boolean;
  padding?: number;
}

export interface StyledAppBarProps extends MuiAppBarProps {
  open: boolean;
}

export interface MenuItem {
  permissions?: RoleType[];
  icon: React.ReactNode;
  name: string;
  path: string;
}

export interface MenuSection {
  sectionName: string;
  items: MenuItem[];
}