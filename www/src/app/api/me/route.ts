import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { readAuthTokenFromRequest } from '@/lib/auth/token.server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

const API_BASE = (API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');

export async function GET(request: NextRequest) {
  try {
    const token = readAuthTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'auth_required' }, { status: 401 });
    }

    const upstream = await fetch(`${API_BASE}/api/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const rawBody = await upstream.text();
    const headers = new Headers();
    const contentType = upstream.headers.get('content-type');
    if (contentType) headers.set('content-type', contentType);
    return new NextResponse(rawBody, {
      status: upstream.status,
      headers,
    });
  } catch (error) {
    console.error('Failed to proxy /api/auth/me', error);
    return NextResponse.json(
      { error: 'Falha ao consultar /api/auth/me.' },
      { status: 500 },
    );
  }
}

