import { AssignmentTurnedIn, ConfirmationNumber, AccountBalance, LocalShipping, LibraryBooks, InsertChart, Engineering, Description, EventRepeat, Dashboard, Handshake, Campaign, People, Badge, Email } from "@mui/icons-material";

import { ROLES } from "@utils/types/models/user";

import type { MenuSection } from "../components/layout/types";

export const appMenuItems: MenuSection[] = [
  {
    sectionName: 'Visão Geral',
    items: [
      {
        name: 'Dashboard',
        path: '/dashboard/general',
        icon: <Dashboard />
      }
    ]
  },
  {
    sectionName: 'Recursos Humanos',
    items: [
      {
        name: 'Monitorados',
        path: '/dashboard/hr/members',
        permissions: [ROLES.DIRETOR_ADMINISTRATIVO_RH, ROLES.NORMAL],
        icon: <Badge />
      }
    ]
  },
  {
    sectionName: 'Gestão Financeira',
    items: [
      {
        name: 'Tesouraria',
        path: '/dashboard/treasury',
        permissions: [ROLES.DIRETOR_FINANCEIRO, ROLES.NORMAL],
        icon: <AccountBalance />
      },
      {
        name: 'Agendamentos',
        path: '/dashboard/recurring-transactions',
        permissions: [ROLES.DIRETOR_FINANCEIRO, ROLES.NORMAL],
        icon: <EventRepeat />
      }
    ]
  },
  {
    sectionName: 'Compras e Contratos',
    items: [
      {
        name: 'Dashboard Contratos',
        path: '/dashboard/contracts/dashboard',
        permissions: [ROLES.DIRETOR_SUPRIMENTOS_CONTRATOS, ROLES.NORMAL],
        icon: <InsertChart />
      },
      {
        name: 'Contratos',
        path: '/dashboard/contracts',
        permissions: [ROLES.DIRETOR_SUPRIMENTOS_CONTRATOS, ROLES.NORMAL],
        icon: <Handshake />
      }
    ]
  },
  {
    sectionName: 'Manutenção',
    items: [
      {
        name: 'Operações',
        path: '/dashboard/maintenance/operations',
        permissions: [ROLES.DIRETOR_MANUTENCAO, ROLES.NORMAL],
        icon: <Engineering />
      },
      {
        name: 'Fechamento',
        path: '/dashboard/maintenance/monthly-closing',
        permissions: [ROLES.DIRETOR_MANUTENCAO, ROLES.NORMAL],
        icon: <AssignmentTurnedIn />
      },
      {
        name: 'Ativos e Operadores',
        path: '/dashboard/maintenance/machine-resources',
        permissions: [ROLES.DIRETOR_MANUTENCAO, ROLES.NORMAL],
        icon: <LocalShipping />
      }
    ]
  },
  {
    sectionName: 'Marketing',
    items: [
      {
        name: 'Marketing',
        path: '/dashboard/admin/marketing',
        permissions: [ROLES.DIRETOR_TI_MARKETING],
        icon: <Campaign />
      }
    ]
  },
  {
    sectionName: 'Secretaria',
    items: [
      {
        name: 'Atas de Reunião',
        path: '/dashboard/admin/secretary/minutes',
        permissions: [ROLES.DIRETOR_ADMINISTRATIVO_RH, ROLES.MEMBRO_ASSEMBLEIA],
        icon: <LibraryBooks />
      }
    ]
  },
  {
    sectionName: 'Tecnologia da Informação',
    items: [
      {
        name: 'Chamados TI',
        path: '/dashboard/tickets',
        permissions: [ROLES.DIRETOR_TI_MARKETING, ROLES.NORMAL],
        icon: <ConfirmationNumber />
      }
    ]
  },
  {
    sectionName: 'Gestão',
    items: [
      {
        name: 'Usuários',
        path: '/dashboard/admin/users',
        permissions: [ROLES.ADMIN],
        icon: <People />
      }
    ]
  },
  {
    sectionName: 'Sistema',
    items: [
      {
        name: 'Emails',
        path: '/dashboard/admin/emails',
        permissions: [ROLES.ADMIN],
        icon: <Email />
      },
      {
        name: 'Logs',
        path: '/dashboard/admin/logs',
        permissions: [ROLES.ADMIN],
        icon: <Description />
      }
    ]
  }
];