import { NextResponse } from 'next/server';

// Minimal proxy for logout only (safe change)
const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

function normalizeDevSetCookie(setCookie: string): string {
  if (process.env.NODE_ENV !== 'development') return setCookie;
  // Remove Domain and Secure; force SameSite=Lax for http dev
  return setCookie
    .replace(/;\s*Domain=[^;]*/gi, '')
    .replace(/;\s*Secure/gi, '')
    .replace(/SameSite\s*=\s*None/gi, 'SameSite=Lax');
}

export async function POST(request: Request) {
  // Always clear client cookies here to ensure logout UX works, regardless of upstream status
  const res = new NextResponse(null, { status: 200 });
  // Expire app session cookie (dev-friendly attributes)
  res.headers.append(
    'set-cookie',
    'caderninho.session=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax',
  );
  // Also clear temporary owner cookie if present (non-HttpOnly)
  res.headers.append('set-cookie', 'x-temp-owner=; Max-Age=0; Path=/; SameSite=Lax');

  try {
    const cookie = request.headers.get('cookie') || '';
    const upstream = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { cookie, accept: 'application/json' },
      cache: 'no-store',
    });

    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) {
      const parts = setCookie.split(/,(?=[^;]+=)/g).map((p) => normalizeDevSetCookie(p.trim()));
      for (const p of parts) res.headers.append('set-cookie', p);
      res.headers.set('x-proxy-set-cookie-count', String(parts.length + 2));
    } else {
      res.headers.set('x-proxy-set-cookie-count', '2');
    }
  } catch {
    // Best-effort: still return 200 with locally-cleared cookies
    res.headers.set('x-proxy-set-cookie-count', '2');
  }

  return res;
}
