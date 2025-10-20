import { type FC, type HTMLProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HealthContext from './health.context';

function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'https://localhost:7269').replace(/\/$/, '');
}

export const HealthProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const [serverUp, setServerUp] = useState(true);
  const [checking, setChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<number | undefined>(undefined);
  const timerRef = useRef<number | undefined>(undefined);

  const refresh = useCallback(async () => {
    setChecking(true);
    try {
      const res = await fetch(`${getApiBase()}/api/health`, { cache: 'no-store' });
      const ok = res.ok;
      setServerUp(ok);
      setLastChecked(Date.now());
      return ok;
    } catch {
      setServerUp(false);
      setLastChecked(Date.now());
      return false;
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => { void refresh(); }, 15000);
    timerRef.current = id;
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [refresh]);

  const value = useMemo(() => ({ serverUp, checking, lastChecked, refresh }), [serverUp, checking, lastChecked, refresh]);

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};

export default HealthProvider;

