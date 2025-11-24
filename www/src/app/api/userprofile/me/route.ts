import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { readAuthTokenFromRequest } from '@/lib/auth/token.server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

export async function GET(req: NextRequest) {
  try {
    const token = readAuthTokenFromRequest(req);
    if (!token) return NextResponse.json({ error: 'auth_required' }, { status: 401 });

    const upstream = await fetch(`${API_BASE_URL}/api/userprofile/me`, {
      method: 'GET',
      headers: { accept: 'application/json', authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    const res = new NextResponse(upstream.body, {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'proxy_failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = readAuthTokenFromRequest(req);
    if (!token) return NextResponse.json({ error: 'auth_required' }, { status: 401 });

    const body = await req.text();
    const upstream = await fetch(`${API_BASE_URL}/api/userprofile/me`, {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'content-type': req.headers.get('content-type') || 'application/json',
        authorization: `Bearer ${token}`,
      },
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
  } catch {
    return NextResponse.json({ error: 'proxy_failed' }, { status: 500 });
  }
}
