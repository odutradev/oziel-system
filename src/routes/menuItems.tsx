import { AssignmentTurnedIn, ConfirmationNumber, AccountBalance, LocalShipping, Description, Engineering, EventRepeat, InsertChart, Dashboard, Handshake, Campaign, People, Badge, Email } from "@mui/icons-material";

import type { MenuSection } from "../components/layout/types";

export const menuItemsAdmin: MenuSection[] = [
  {
    sectionName: 'Visão Geral',
    items: [
      { name: 'Dashboard', path: '/dashboard/general', icon: <Dashboard /> }
    ]
  },
  {
    sectionName: 'Recursos Humanos',
    items: [
      { name: 'Monitorados', path: '/dashboard/hr/members', icon: <Badge /> }
    ]
  },
  {
    sectionName: 'Gestão Financeira',
    items: [
      { name: 'Tesouraria', path: '/dashboard/treasury', icon: <AccountBalance /> },
      { name: 'Agendamentos', path: '/dashboard/recurring-transactions', icon: <EventRepeat /> }
    ]
  },
  {
    sectionName: 'Compras e Contratos',
    items: [
      { name: 'Dashboard Contratos', path: '/dashboard/contracts/dashboard', icon: <InsertChart /> },
      { name: 'Contratos', path: '/dashboard/contracts', icon: <Handshake /> }
    ]
  },
  {
    sectionName: 'Manutenção',
    items: [
      { name: 'Operações', path: '/dashboard/maintenance/operations', icon: <Engineering /> },
      { name: 'Fechamento', path: '/dashboard/maintenance/monthly-closing', icon: <AssignmentTurnedIn /> },
      { name: 'Ativos e Operadores', path: '/dashboard/maintenance/machine-resources', icon: <LocalShipping /> }
    ]
  },
  {
    sectionName: 'Gestão',
    items: [
      { name: 'Marketing', path: '/dashboard/admin/marketing', icon: <Campaign /> },
      { name: 'Usuários', path: '/dashboard/admin/users', icon: <People /> }
    ]
  },
  {
    sectionName: 'Sistema',
    items: [
      { name: 'Chamados TI', path: '/dashboard/tickets', icon: <ConfirmationNumber /> },
      { name: 'Emails', path: '/dashboard/admin/emails', icon: <Email /> },
      { name: 'Logs', path: '/dashboard/admin/logs', icon: <Description /> }
    ]
  }
];

export const menuItemsViewer: MenuSection[] = [
  {
    sectionName: 'Visão Geral',
    items: [
      { name: 'Dashboard', path: '/dashboard/general', icon: <Dashboard /> }
    ]
  },
  {
    sectionName: 'Recursos Humanos',
    items: [
      { name: 'Monitorados', path: '/dashboard/hr/members', icon: <Badge /> }
    ]
  },
  {
    sectionName: 'Gestão Financeira',
    items: [
      { name: 'Tesouraria', path: '/dashboard/treasury', icon: <AccountBalance /> },
      { name: 'Agendamentos', path: '/dashboard/recurring-transactions', icon: <EventRepeat /> }
    ]
  },
  {
    sectionName: 'Compras e Contratos',
    items: [
      { name: 'Dashboard Contratos', path: '/dashboard/contracts/dashboard', icon: <InsertChart /> },
      { name: 'Contratos', path: '/dashboard/contracts', icon: <Handshake /> }
    ]
  },
  {
    sectionName: 'Manutenção',
    items: [
      { name: 'Operações', path: '/dashboard/maintenance/operations', icon: <Engineering /> },
      { name: 'Fechamento', path: '/dashboard/maintenance/monthly-closing', icon: <AssignmentTurnedIn /> },
      { name: 'Ativos e Operadores', path: '/dashboard/maintenance/machine-resources', icon: <LocalShipping /> }
    ]
  },
  {
    sectionName: 'Sistema',
    items: [
      { name: 'Chamados TI', path: '/dashboard/tickets', icon: <ConfirmationNumber /> }
    ]
  }
];