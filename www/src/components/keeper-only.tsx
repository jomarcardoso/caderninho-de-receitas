'use client';

import { useEffect, useState } from 'react';
import { hasKeeperPermission } from '@/services/auth/auth.service';

export default function KeeperOnly({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    hasKeeperPermission()
      .then((v) => active && setOk(v))
      .catch(() => active && setOk(false));
    return () => {
      active = false;
    };
  }, []);

  if (ok === null) return null;
  return ok ? <>{children}</> : null;
}

