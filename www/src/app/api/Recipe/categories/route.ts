import { NextResponse } from 'next/server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

export async function GET(req: Request) {
  try {
    const upstream = await fetch(`${API_BASE_URL}/api/recipe/categories`, {
      method: 'GET',
      headers: { accept: 'application/json' },
      cache: 'force-cache',
      next: { revalidate: 300 },
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

