import type { BreadcrumbItem } from "../../types";
import type { SxProps, Theme } from "@mui/material";

export interface BreadcrumbsDisplayProps {
  items?: BreadcrumbItem[];
  onItemClick?: () => void;
  maxItems?: number;
  sx?: SxProps<Theme>;
  itemSx?: SxProps<Theme>;
}