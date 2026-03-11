import { Breadcrumbs, Link, Typography } from "@mui/material";

import type { BreadcrumbsDisplayProps } from "./types";

const BreadcrumbsDisplay = ({ items, onItemClick, maxItems, sx, itemSx }: BreadcrumbsDisplayProps) => {
  if (!items?.length) return null;

  return (
    <Breadcrumbs
      maxItems={maxItems}
      separator="›"
      aria-label="breadcrumb"
      sx={sx}
    >
      {items.map((crumb, idx) => {
        const isLast = idx === items.length - 1;

        if (isLast) {
          return (
            <Typography key={crumb.url} color="text.primary" sx={itemSx}>
              {crumb.name}
            </Typography>
          );
        }

        return (
          <Link
            key={crumb.url}
            underline="hover"
            color="inherit"
            href={crumb.url}
            onClick={onItemClick}
            sx={itemSx}
          >
            {crumb.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsDisplay;