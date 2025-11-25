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

export async function readAuthTokenFromCookies(): Promise<string | undefined> {
  try {
    const store = await cookies();
    return store.get(AUTH_COOKIE_NAME)?.value || undefined;
  } catch {
    return undefined;
  }
}

export async function appendServerAuthHeader(headers: Headers): Promise<void> {
  if (headers.has('authorization')) return;
  const token = await readAuthTokenFromCookies();
  if (token) headers.set('authorization', `Bearer ${token}`);
}
