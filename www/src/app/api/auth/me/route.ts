import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

const API_BASE = (API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');

export async function GET(request: NextRequest) {
  try {
    const upstream = await fetch(`${API_BASE}/api/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
      credentials: 'include',
    });

    const rawBody = await upstream.text();
    const headers = new Headers();
    const contentType = upstream.headers.get('content-type');
    if (contentType) headers.set('content-type', contentType);
    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) headers.set('set-cookie', setCookie);

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

