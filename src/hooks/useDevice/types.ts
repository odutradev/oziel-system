import { Breakpoint } from "@mui/material";
import { ReactNode } from "react";

export interface DeviceInfo {
  os: "ios" | "android" | "windows" | "macos" | "linux" | "unknown";
  orientation: "portrait" | "landscape";
  breakpoint: Breakpoint;
  isOnline: boolean;
  isMobile: boolean;
  isPwa: boolean;
}

export interface DeviceProviderProps {
  children: ReactNode;
}