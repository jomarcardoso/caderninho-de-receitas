import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { readAuthTokenFromRequest } from '@/lib/auth/token.server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

async function forward(method: string, req: NextRequest, id: string) {
  const url = new URL(req.url);
  const qs = url.search ? url.search : '';
  const upstreamUrl = `${API_BASE_URL}/api/Recipe/${encodeURIComponent(id)}${qs}`;

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
    const headers = new Headers({
      accept: 'application/json',
      ...(body ? { 'content-type': req.headers.get('content-type') || 'application/json' } : {}),
    });
    const token = readAuthTokenFromRequest(req);
    if (token) headers.set('authorization', `Bearer ${token}`);

    const upstream = await fetch(upstreamUrl, {
      method,
      headers,
      body,
      cache: 'no-store',
    });

    const res = new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    });

    return res;
  } catch (e) {
    return NextResponse.json({ error: 'proxy_failed' }, { status: 500 });
  }
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return forward('GET', _req, id);
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return forward('PUT', req, id);
}

export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  return forward('DELETE', req, id);
}
