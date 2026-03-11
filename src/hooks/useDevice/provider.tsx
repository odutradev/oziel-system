import { useMediaQuery, useTheme, Breakpoint } from "@mui/material";
import { useState, useEffect } from "react";

import { getOrientation, getOS } from "./functions/device";
import { getNetworkStatus } from "./functions/network";
import { getPwaStatus } from "./functions/pwa";
import { DeviceContext } from "./context";

import type { DeviceProviderProps } from "./types";

const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const [orientation, setOrientation] = useState<"portrait" | "landscape">(getOrientation());
  const [isOnline, setIsOnline] = useState<boolean>(getNetworkStatus());
  const [isPwa, setIsPwa] = useState<boolean>(getPwaStatus());

  useEffect(() => {
    const handleOrientation = () => setOrientation(getOrientation());
    const handlePwaChange = () => setIsPwa(getPwaStatus());
    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => setIsOnline(true);

    window.addEventListener("orientationchange", handleOrientation);
    window.addEventListener("appinstalled", handlePwaChange);
    window.addEventListener("resize", handleOrientation);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    const pwaMediaQuery = window.matchMedia("(display-mode: standalone)");
    if (pwaMediaQuery.addEventListener) {
      pwaMediaQuery.addEventListener("change", handlePwaChange);
    } else {
      pwaMediaQuery.addListener(handlePwaChange);
    }

    return () => {
      window.removeEventListener("orientationchange", handleOrientation);
      window.removeEventListener("appinstalled", handlePwaChange);
      window.removeEventListener("resize", handleOrientation);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);

      if (pwaMediaQuery.removeEventListener) {
        pwaMediaQuery.removeEventListener("change", handlePwaChange);
      } else {
        pwaMediaQuery.removeListener(handlePwaChange);
      }
    };
  }, []);

  const getCurrentBreakpoint = (): Breakpoint => {
    if (isXs) return "xs";
    if (isSm) return "sm";
    if (isMd) return "md";
    if (isLg) return "lg";
    if (isXl) return "xl";
    return "xs";
  };

  const value = {
    breakpoint: getCurrentBreakpoint(),
    os: getOS(),
    orientation,
    isOnline,
    isMobile,
    isPwa
  };

  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;