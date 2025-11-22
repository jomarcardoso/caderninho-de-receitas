import { cookies, headers } from 'next/headers';
import { getOwnerIdFromCookies } from '@/lib/api-server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

function buildCookieHeader(): string | undefined {
  try {
    const store = cookies();
    const all = store.getAll();
    if (!all || all.length === 0) return undefined;
    return all.map((c) => `${c.name}=${c.value}`).join('; ');
  } catch {
    return undefined;
  }
}

async function fetchRolesFromBackend(
  cookieHeader?: string,
): Promise<string[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { roles?: string[] } | null;
    if (!data?.roles) return null;
    return data.roles.map((role) => role.toLowerCase());
  } catch {
    return null;
  }
}

async function fetchRolesViaNextRoute(
  cookieHeader?: string,
): Promise<string[] | null> {
  try {
    const hdrs = headers();
    const host = hdrs.get('x-forwarded-host') ?? hdrs.get('host');
    if (!host) return null;
    const protocol =
      hdrs.get('x-forwarded-proto') ??
      (host.includes('localhost') ? 'http' : 'https');

    const res = await fetch(`${protocol}://${host}/api/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { roles?: string[] } | null;
    if (!data?.roles) return null;
    return data.roles.map((role) => role.toLowerCase());
  } catch {
    return null;
  }
}

export async function fetchServerUserRoles(): Promise<string[] | null> {
  const ownerToken = await getOwnerIdFromCookies();
  if (ownerToken) return ['owner'];
  const cookieHeader = buildCookieHeader();
  return (
    (await fetchRolesFromBackend(cookieHeader)) ??
    (await fetchRolesViaNextRoute(cookieHeader))
  );
}

export async function hasKeeperOrHigherServer(): Promise<boolean> {
  const roles = await fetchServerUserRoles();
  return roles
    ? roles.some((role) => ['keeper', 'admin', 'owner'].includes(role))
    : false;
}
