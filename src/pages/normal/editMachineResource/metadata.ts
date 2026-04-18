import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Manutenção', url: '/dashboard/maintenance/machine-resources' },
        { name: 'Ativos e Operadores', url: '/dashboard/maintenance/machine-resources' }
    ],
    padding: 3
};

export default metadata;