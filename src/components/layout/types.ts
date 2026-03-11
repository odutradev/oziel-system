import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

export interface MenuItem {
  icon: React.ReactNode;
  path: string;
  name: string;
};

export interface BreadcrumbItem {
  name: string;
  url: string;
};
  
export interface LayoutProps {
  navbarComponent?: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  disableGetUser?: boolean;
  pageTitle?: string;
  loading?: boolean;
  padding?: number;
};
  
export interface StyledAppBarProps extends MuiAppBarProps {
  open: boolean;
};
  
export interface MenuItem {
  icon: React.ReactNode;
  name: string;
  path: string;
};
  
export interface MenuSection {
  sectionName: string;
  items: MenuItem[];
};