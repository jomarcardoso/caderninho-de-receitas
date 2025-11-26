import { cookies, headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth/constants';

function readTokenFromCookieHeader(
  rawCookie: string | null | undefined,
): string | undefined {
  if (!rawCookie) return undefined;
  try {
    const pairs = rawCookie.split(';').map((c) => c.trim());
    for (const p of pairs) {
      if (p.startsWith(`${AUTH_COOKIE_NAME}=`)) {
        return p.substring(AUTH_COOKIE_NAME.length + 1) || undefined;
      }
    }
  } catch {
    /* ignore */
  }
  return undefined;
}

export function readAuthTokenFromRequest(
  request: Pick<NextRequest, 'headers' | 'cookies'>,
): string | undefined {
  const raw = request.headers.get('authorization');
  if (raw) return raw.replace(/^Bearer\s+/i, '').trim() || undefined;
  try {
    const fromCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    if (fromCookie) return fromCookie;
  } catch {
    /* ignore */
  }
  const cookieHeader = request.headers.get('cookie');
  return readTokenFromCookieHeader(cookieHeader);
}

export async function readAuthTokenFromCookies(): Promise<string | undefined> {
  try {
    const jar: any = (cookies as any)();
    const store = jar && typeof jar.then === 'function' ? await jar : jar;
    return store?.get?.(AUTH_COOKIE_NAME)?.value || undefined;
  } catch {
    return undefined;
  }
}

export async function readAuthTokenFromHeaders(): Promise<string | undefined> {
  try {
    const hdrs = await headers();
    const raw = hdrs.get('authorization');
    if (raw) return raw.replace(/^Bearer\s+/i, '').trim() || undefined;
    const fromCookieHeader = readTokenFromCookieHeader(hdrs.get('cookie'));
    if (fromCookieHeader) return fromCookieHeader;
    return await readAuthTokenFromCookies();
  } catch {
    return undefined;
  }
}

export async function appendServerAuthHeader(headers: Headers): Promise<void> {
  if (headers.has('authorization')) return;
  const token =
    (await readAuthTokenFromHeaders()) ?? (await readAuthTokenFromCookies());
  if (token) headers.set('authorization', `Bearer ${token}`);
}
