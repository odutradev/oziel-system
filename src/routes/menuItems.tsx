import { Description, Dashboard, BarChart, Timeline, People, Email } from '@mui/icons-material';

import type { MenuSection } from '../components/layout/types';

export const menuItemsAdmin: MenuSection[] = [
  {
    sectionName: 'Visão Geral',
    items: [
      { name: 'Dashboard', path: '/dashboard/general', icon: <Dashboard /> },
    ],
  },
  {
    sectionName: 'Gestão',
    items: [
      { name: 'Usuários', path: '/dashboard/admin/users', icon: <People /> }
    ],
  },
  {
    sectionName: 'Relatórios',
    items: [
      { name: 'Provas', path: '/dashboard/admin/digitalproves-metrics', icon: <BarChart /> },
      { name: 'Usuários', path: '/dashboard/admin/users-metrics', icon: <Timeline /> },
    ],
  },
  {
    sectionName: 'Sistema',
    items: [
      { name: 'Emails', path: '/dashboard/admin/emails', icon: <Email /> },
      { name: 'Logs', path: '/dashboard/admin/logs', icon: <Description /> },
    ],
  },
];

export const menuItemsViewer: MenuSection[] = [
  {
    sectionName: 'Visão Geral',
    items: [
      { name: 'Dashboard', path: '/dashboard/general', icon: <Dashboard /> },
    ],
  }
];