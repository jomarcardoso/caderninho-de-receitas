import { NextResponse } from 'next/server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

/**
 * Proxies POST /api/auth/ensure-owner to the backend and forwards Set-Cookie
 * so the browser stores the ownerId cookie during SSR/CSR flows.
 */
export async function POST(req: Request) {
  try {
    // Reuse incoming cookies to let backend correlate session if present
    const incomingCookie = req.headers.get('cookie') || undefined;

    // Body is optional for ensure-owner; pass through if present
    let body: string | undefined;
    try {
      // Read as text to avoid streaming issues
      const txt = await req.text();
      body = txt && txt.length ? txt : undefined;
    } catch {
      body = undefined;
    }

    const upstream = await fetch(`${API_BASE_URL}/api/auth/ensure-owner`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        ...(body ? { 'content-type': req.headers.get('content-type') || 'application/json' } : {}),
        ...(incomingCookie ? { cookie: incomingCookie } : {}),
      },
      body,
      // Avoid caching to guarantee cookie issuance
      cache: 'no-store',
      credentials: 'include',
    });

    const text = await upstream.text();

    const res = new NextResponse(text || '{}', {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    });

    // Forward every Set-Cookie header from upstream (supports multiple)
    const h: any = upstream.headers as any;
    const setCookies: string[] =
      (typeof h.getSetCookie === 'function' ? h.getSetCookie() : undefined) || [];

    if (setCookies.length === 0) {
      // Fallback: iterate headers and collect repeated set-cookie entries
      for (const [k, v] of upstream.headers.entries()) {
        if (k.toLowerCase() === 'set-cookie' && v) res.headers.append('set-cookie', v);
      }
    } else {
      for (const sc of setCookies) res.headers.append('set-cookie', sc);
    }

    return res;
  } catch (e) {
    return NextResponse.json({ error: 'proxy_failed' }, { status: 500 });
  }
}

