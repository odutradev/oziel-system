import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Administração', url: '#' },
        { name: 'Logs do Sistema', url: '/dashboard/admin/logs' }
    ],
    pageTitle: "Logs do Sistema",
    padding: 3
};

export default metadata;
