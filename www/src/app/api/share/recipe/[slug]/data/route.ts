import { NextResponse } from 'next/server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await ctx.params;
    const upstream = await fetch(`${API_BASE_URL}/api/share/recipe/${encodeURIComponent(slug)}/data`, {
      method: 'GET',
      headers: { accept: 'application/json' },
      cache: 'no-store',
    });

    const text = await upstream.text();
    return new NextResponse(text || '{}', {
      status: upstream.status,
      headers: {
        'content-type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
      },
    });
  } catch {
    return NextResponse.json({ error: 'proxy_failed' }, { status: 500 });
  }
}

