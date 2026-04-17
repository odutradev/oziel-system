import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Contratos', url: '/dashboard/contracts' }
    ],
    padding: 3
};

export default metadata;