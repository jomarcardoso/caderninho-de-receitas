import { cookies } from 'next/headers';

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

export function getOwnerIdFromCookies(): string | undefined {
  try {
    const jar = cookies();
    return jar.get('x-temp-owner')?.value;
  } catch {
    return undefined;
  }
}

export async function fetchApiJson<T = any>(path: string, init?: RequestInit): Promise<T> {
  const bases = getServerApiBases();
  const owner = getOwnerIdFromCookies();

  const headers = new Headers(init?.headers as HeadersInit | undefined);
  if (owner && !headers.has('X-Temporary-Owner')) headers.set('X-Temporary-Owner', owner);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  let lastErr: unknown;
  for (const base of bases) {
    try {
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
  const owner = getOwnerIdFromCookies();

  const headers = new Headers(init?.headers as HeadersInit | undefined);
  if (owner && !headers.has('X-Temporary-Owner')) headers.set('X-Temporary-Owner', owner);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  let lastErr: unknown;
  for (const base of bases) {
    try {
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
