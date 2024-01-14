export function isMobile() {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 1024;
  }

  return true;
}
