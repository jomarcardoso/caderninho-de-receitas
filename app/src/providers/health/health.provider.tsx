import { type FC, type HTMLProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import HealthContext from './health.context';

function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

export const HealthProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const [serverUp, setServerUp] = useState(false);
  const [checking, setChecking] = useState(true);
  const [lastChecked, setLastChecked] = useState<number | undefined>(undefined);
  const timerRef = useRef<number | undefined>(undefined);

  const refresh = useCallback(async () => {
    setChecking(true);
    try {
      // Evita requests quando o navegador está offline (previne erros no console)
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        setServerUp(false);
        setLastChecked(Date.now());
        return false;
      }

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
    setChecking(true);
    void refresh();
  }, [refresh]);

  const value = useMemo(() => ({ serverUp, checking, lastChecked, refresh }), [serverUp, checking, lastChecked, refresh]);

  return <HealthContext.Provider value={value}>{children}</HealthContext.Provider>;
};

export default HealthProvider;
