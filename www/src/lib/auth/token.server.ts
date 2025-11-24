import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth/constants';

export function readAuthTokenFromRequest(
  request: Pick<NextRequest, 'cookies'>,
): string | undefined {
  try {
    return request.cookies.get(AUTH_COOKIE_NAME)?.value || undefined;
  } catch {
    return undefined;
  }
}

export function readAuthTokenFromCookies(): string | undefined {
  try {
    const store = cookies();
    return store.get(AUTH_COOKIE_NAME)?.value || undefined;
  } catch {
    return undefined;
  }
}

export function appendServerAuthHeader(headers: Headers): void {
  if (headers.has('authorization')) return;
  const token = readAuthTokenFromCookies();
  if (token) headers.set('authorization', `Bearer ${token}`);
}
