import type { BreadcrumbItem } from "../../types";
import type { ReactNode } from "react";

export interface LayoutDrawerProps {
    breadcrumbs?: BreadcrumbItem[];
    width: number | string;
    onClose?: () => void;
    children: ReactNode;
    isMobile?: boolean;
    open?: boolean;
}