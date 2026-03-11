export const getOrientation = (): "portrait" | "landscape" => {
  if (typeof window !== "undefined" && window.screen?.orientation) {
    return window.screen.orientation.type.includes("portrait")
      ? "portrait"
      : "landscape";
  }
  return "landscape";
};

export const getOS = (): "ios" | "android" | "windows" | "macos" | "linux" | "unknown" => {
  if (typeof window === "undefined") return "unknown";
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) return "ios";
  if (/android/.test(userAgent)) return "android";
  if (/win/.test(userAgent)) return "windows";
  if (/mac/.test(userAgent)) return "macos";
  if (/linux/.test(userAgent)) return "linux";
  
  return "unknown";
};