'use client';

import { useEffect, useState } from 'react';
import { hasAdminPermission } from '@/services/auth/auth.service';

export default function AdminOnly({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    hasAdminPermission()
      .then((v) => active && setOk(v))
      .catch(() => active && setOk(false));
    return () => {
      active = false;
    };
  }, []);

  if (ok === null) return null;
  return ok ? <>{children}</> : null;
}

