import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Recursos Humanos', url: '/dashboard/hr/members' },
        { name: 'Monitorados', url: '/dashboard/hr/members' }
    ],
    padding: 3
};

export default metadata;