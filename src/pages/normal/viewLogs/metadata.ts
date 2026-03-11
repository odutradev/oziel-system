import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: 'Dashboard', url: '/dashboard/general' },
        { name: 'Meus Logs', url: '/dashboard/logs' }
    ],
    pageTitle: "Meus Logs",
    padding: 3
};  

export default metadata;