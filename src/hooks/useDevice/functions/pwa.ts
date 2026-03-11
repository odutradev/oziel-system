export const getPwaStatus = (): boolean => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(display-mode: standalone)").matches;
  }
  return false;
};