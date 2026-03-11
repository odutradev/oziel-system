import { SystemStoreData } from "./types";

export const systemStoreDefaultValues: SystemStoreData = {
    navbarSize: { width: 0, height: 0 },
    contentSize: { width: 0, height: 0 },
    pwaInstallRejected: false,
    checkUserTheme: false,
    offlineReady: false,
    needRefresh: false,
    isOffline: false,
    pwaEvent: null,
    menuOpen: true,
    loading: false,
    theme: "light",
};