import { cookies } from 'next/headers';
import { appendServerAuthHeader } from '@/lib/auth/token.server';

export function getServerApiBases(): string[] {
  const out: string[] = [];
  const add = (v?: string) => {
    if (v && typeof v === 'string' && v.trim()) out.push(v.replace(/\/$/, ''));
  };

  add(process.env.NEXT_PUBLIC_API_BASE_URL);
  // Common local defaults (HTTPS first, then HTTP)
  add('https://localhost:7269');
  add('http://localhost:5106');

  // de-dup while preserving order
  return Array.from(new Set(out));
}

// Next 15 dynamic API: cookies() may be async; handle both
async function readCookiesSafe(): Promise<ReturnType<typeof cookies> | any> {
  try {
    const maybe: any = (cookies as any)();
    if (maybe && typeof maybe.then === 'function') {
      return await maybe;
    }
    return maybe;
  } catch {
    return undefined as any;
  }
}

async function buildCookieHeaderFromNext(): Promise<string | undefined> {
  try {
    const jar: any = await readCookiesSafe();
    const all = jar?.getAll ? jar.getAll() : [];
    if (!all || all.length === 0) return undefined;
    return all.map((c: any) => `${c.name}=${c.value}`).join('; ');
  } catch {
    return undefined;
  }
}

export async function fetchApiJson<T = any>(path: string, init?: RequestInit): Promise<T> {
  const bases = getServerApiBases();

  const headers = new Headers(init?.headers as HeadersInit | undefined);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  await appendServerAuthHeader(headers);

  // If calling local Next route (/api/*), forward browser cookies (e.g. theme)
  if (path.startsWith('/api/')) {
    try {
      const cookieHeader = await buildCookieHeaderFromNext();
      if (cookieHeader && !headers.has('cookie')) headers.set('cookie', cookieHeader);
      const options: RequestInit & { next?: any } = { ...(init || {}), headers } as any;
      if (!options.next) options.cache = 'no-store';
      const res = await fetch(path, options);
      if (res.ok) return (await res.json()) as T;
      // fall through if local route not available
    } catch {
      // ignore and fall back to external base URLs
    }
  }

  let lastErr: unknown;
  for (const base of bases) {
    try {
      await appendServerAuthHeader(headers);
      const options: RequestInit & { next?: any } = { ...(init || {}), headers } as any;
      if (!options.next) {
        options.cache = 'no-store';
      }
      const res = await fetch(`${base}${path}`, options);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
      // try next base
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Fetch failed');
}

export async function fetchApiJsonWithTags<T = any>(path: string, tags: string[], init?: RequestInit): Promise<T> {
  const bases = getServerApiBases();

  const headers = new Headers(init?.headers as HeadersInit | undefined);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  await appendServerAuthHeader(headers);

  if (path.startsWith('/api/')) {
    try {
      const cookieHeader = await buildCookieHeaderFromNext();
      if (cookieHeader && !headers.has('cookie')) headers.set('cookie', cookieHeader);
      const res = await fetch(path, { ...init, headers, next: { tags } });
      if (res.ok) return (await res.json()) as T;
    } catch {
      // fall through
    }
  }

  let lastErr: unknown;
  for (const base of bases) {
    try {
      await appendServerAuthHeader(headers);
      const res = await fetch(`${base}${path}`, { ...init, headers, next: { tags } });
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      return (await res.json()) as T;
    } catch (e) {
      lastErr = e;
      // try next base
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Fetch failed');
}
