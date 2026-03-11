import { createContext } from "react";

import type { DeviceInfo } from "./types";

export const DeviceContext = createContext<DeviceInfo | null>(null);