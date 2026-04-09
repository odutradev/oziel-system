import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Operadores", url: "/dashboard/maintenance/operators" }
    ],
    pageTitle: "Gestão de Operadores"
};

export default metadata;