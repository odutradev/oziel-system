import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Operações", url: "/dashboard/maintenance/operations" }
    ],
    pageTitle: "Gestão de Operações de Máquinas"
};

export default metadata;