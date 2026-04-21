import type { LayoutProps } from "@components/layout/types";

const metadata: Partial<LayoutProps> = {
    breadcrumbs: [
        { name: "Dashboard", url: "/dashboard/general" },
        { name: "Secretaria", url: "/dashboard/admin/secretary/minutes" },
        { name: "Ata", url: "" }
    ],
    pageTitle: "Editar Ata"
};

export default metadata;