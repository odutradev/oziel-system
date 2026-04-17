import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Frotas e Operadores", url: "/dashboard/maintenance/resources" }
    ],
    pageTitle: "Recursos de Manutenção"
};

export default metadata;