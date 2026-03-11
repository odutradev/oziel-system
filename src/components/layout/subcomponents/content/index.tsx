import { useEffect, useRef } from "react";
import { Box } from "@mui/material";

import useSystemStore from "@stores/system";

import type { LayoutContentProps } from "./types";

const Content = ({ children, padding }: LayoutContentProps) => {
  const { updateSystem } = useSystemStore();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      updateSystem({ contentSize: { width, height } });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [updateSystem]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: padding }} ref={ref}>
      {children}
    </Box>
  );
};

export default Content;