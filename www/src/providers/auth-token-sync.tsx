'use client';

import { useEffect } from 'react';
import {
  getAuthToken,
  subscribeAuthToken,
} from '@common/services/auth/token.storage';
import { syncAuthSession } from '@/lib/auth/session.client';

export function AuthTokenSync(): null {
  useEffect(() => {
    const current = getAuthToken();
    if (current) {
      syncAuthSession(current).catch(() => {});
    }
    const unsubscribe = subscribeAuthToken((token) => {
      syncAuthSession(token).catch(() => {});
    });
    return unsubscribe;
  }, []);
  return null;
}
