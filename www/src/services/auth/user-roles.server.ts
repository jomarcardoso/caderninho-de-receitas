import { headers } from 'next/headers';
import {
  appendServerAuthHeader,
  readAuthTokenFromCookies,
} from '@/lib/auth/token.server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

function buildAuthHeaders(extra?: HeadersInit): Headers {
  const hdrs = new Headers(extra);
  hdrs.set('Accept', hdrs.get('Accept') ?? 'application/json');
  void appendServerAuthHeader(hdrs);
  return hdrs;
}

async function fetchRolesFromBackend(): Promise<string[] | null> {
  try {
    const headers = buildAuthHeaders();
    if (!headers.has('authorization')) return null;
    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers,
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

async function fetchRolesViaNextRoute(): Promise<string[] | null> {
  try {
    const hdrs = headers();
    const host = hdrs.get('x-forwarded-host') ?? hdrs.get('host');
    if (!host) return null;
    const protocol =
      hdrs.get('x-forwarded-proto') ??
      (host.includes('localhost') ? 'http' : 'https');

    const res = await fetch(`${protocol}://${host}/api/me`, {
      method: 'GET',
      headers: buildAuthHeaders(),
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
  const token = await readAuthTokenFromCookies();
  if (!token) return null;
  return (
    (await fetchRolesFromBackend()) ??
    (await fetchRolesViaNextRoute())
  );
}

export async function hasKeeperOrHigherServer(): Promise<boolean> {
  const roles = await fetchServerUserRoles();
  return roles
    ? roles.some((role) => ['keeper', 'admin', 'owner'].includes(role))
    : false;
}
