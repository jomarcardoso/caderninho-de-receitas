import { NextResponse } from 'next/server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

function forwardCookiesFrom(req: Request) {
  const incomingCookie = req.headers.get('cookie') || undefined;
  return incomingCookie ? { cookie: incomingCookie } : {};
}

export async function GET(req: Request) {
  try {
    const upstream = await fetch(`${API_BASE_URL}/api/userprofile/me`, {
      method: 'GET',
      headers: { accept: 'application/json', ...forwardCookiesFrom(req) },
      cache: 'no-store',
      credentials: 'include',
    });
    const res = new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    });
    const h: any = upstream.headers as any;
    const setCookies: string[] = (typeof h.getSetCookie === 'function' ? h.getSetCookie() : undefined) || [];
    if (setCookies.length === 0) {
      for (const [k, v] of upstream.headers.entries()) if (k.toLowerCase() === 'set-cookie' && v) res.headers.append('set-cookie', v);
    } else {
      for (const sc of setCookies) res.headers.append('set-cookie', sc);
    }
    return res;
  } catch {
    return NextResponse.json({ error: 'proxy_failed' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.text();
    const upstream = await fetch(`${API_BASE_URL}/api/userprofile/me`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'content-type': req.headers.get('content-type') || 'application/json',
        ...forwardCookiesFrom(req),
      },
      body,
      cache: 'no-store',
      credentials: 'include',
    });
    const res = new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    });
    const h: any = upstream.headers as any;
    const setCookies: string[] = (typeof h.getSetCookie === 'function' ? h.getSetCookie() : undefined) || [];
    if (setCookies.length === 0) {
      for (const [k, v] of upstream.headers.entries()) if (k.toLowerCase() === 'set-cookie' && v) res.headers.append('set-cookie', v);
    } else {
      for (const sc of setCookies) res.headers.append('set-cookie', sc);
    }
    return res;
  } catch {
    return NextResponse.json({ error: 'proxy_failed' }, { status: 500 });
  }
}

