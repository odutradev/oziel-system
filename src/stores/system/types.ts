export interface ElementSize {
  width: number;
  height: number;
}

export interface SystemStoreData {
  pwaEvent: BeforeInstallPromptEvent | null;
  theme: "light" | "dark";
  pwaInstallRejected: boolean;
  checkUserTheme: boolean;
  offlineReady: boolean;
  navbarSize: ElementSize;
  contentSize: ElementSize;
  needRefresh: boolean;
  isOffline: boolean;
  menuOpen: boolean;
  loading: boolean;
};

export interface SystemStore {
  updateSystem: (partialSystem: Partial<SystemStoreData>) => void;
  setLoading: (currentLoading?: boolean) => void;
  setSystem: (system: SystemStoreData) => void;
  system: SystemStoreData;
  reset: () => void;
};