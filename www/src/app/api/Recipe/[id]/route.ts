import { NextResponse } from 'next/server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

async function forward(method: string, req: Request, id: string) {
  const url = new URL(req.url);
  const qs = url.search ? url.search : '';
  const upstreamUrl = `${API_BASE_URL}/api/Recipe/${encodeURIComponent(id)}${qs}`;

  const incomingCookie = req.headers.get('cookie') || undefined;
  let body: string | undefined;
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      const txt = await req.text();
      body = txt && txt.length ? txt : undefined;
    } catch {
      body = undefined;
    }
  }

  try {
    const upstream = await fetch(upstreamUrl, {
      method,
      headers: {
        accept: 'application/json',
        ...(body ? { 'content-type': req.headers.get('content-type') || 'application/json' } : {}),
        ...(incomingCookie ? { cookie: incomingCookie } : {}),
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

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return forward('GET', _req, id);
}

export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return forward('PUT', req, id);
}

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return forward('DELETE', req, id);
}
