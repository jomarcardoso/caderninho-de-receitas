import { type FC, type HTMLProps, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import RoleContext from './role.context';
import HealthContext from '../health/health.context';
import { fetchMe, hasKeeperPermission } from 'services/auth/auth.service';

export const RoleProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const { serverUp } = useContext(HealthContext);
  const [roles, setRoles] = useState<string[]>([]);
  const [canEditFood, setCanEditFood] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!serverUp) {
      setRoles([]);
      setCanEditFood(false);
      return;
    }
    setLoading(true);
    try {
      const me = await fetchMe();
      setRoles(me?.roles ?? []);
    } finally {
      try {
        const ok = await hasKeeperPermission();
        setCanEditFood(ok);
      } catch {
        setCanEditFood(false);
      }
      setLoading(false);
    }
  }, [serverUp]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    const onLogin = () => { void refresh(); };
    const onLogout = () => { setRoles([]); setCanEditFood(false); };
    window.addEventListener('app:user:login', onLogin as EventListener);
    window.addEventListener('app:user:logout', onLogout as EventListener);
    return () => {
      window.removeEventListener('app:user:login', onLogin as EventListener);
      window.removeEventListener('app:user:logout', onLogout as EventListener);
    };
  }, [refresh]);

  const value = useMemo(() => ({ roles, canEditFood, loading, refresh }), [roles, canEditFood, loading, refresh]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export default RoleProvider;

