/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
    readonly VITE_CONTROL_ACCESS: string;
    readonly VITE_PRODUCTION: string;
    readonly VITE_BASEURL: string;
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

interface Window {
    deferredPrompt: BeforeInstallPromptEvent | null;
}