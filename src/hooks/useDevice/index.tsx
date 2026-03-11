import { useContext } from "react";

import { DeviceContext } from "./context";

import type { DeviceInfo } from "./types";

const useDevice = (): DeviceInfo => {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }

  return context;
};

export default useDevice;