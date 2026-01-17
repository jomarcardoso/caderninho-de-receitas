import { useEffect, useState } from 'react';

function getInitialOnline() {
  if (typeof window === 'undefined') return false;

  return window.navigator.onLine;
}

export function useIsOnline() {
  const [isOnline, setIsOnline] = useState(getInitialOnline());

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }, []);

  return isOnline;
}
