import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth/constants';

type SessionPayload = {
  token?: string;
};

function resolveMaxAge(token: string): number | undefined {
  const parts = token.split('.');
  if (parts.length < 2) return undefined;
  try {
    const json = Buffer.from(parts[1], 'base64').toString('utf8');
    const payload = JSON.parse(json) as { exp?: number };
    if (!payload?.exp) return undefined;
    const nowSeconds = Math.floor(Date.now() / 1000);
    const delta = Math.max(0, payload.exp - nowSeconds);
    return delta > 0 ? delta : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SessionPayload;
    const token = typeof body?.token === 'string' ? body.token.trim() : '';
    if (!token) {
      return NextResponse.json({ error: 'token_required' }, { status: 400 });
    }

    const res = NextResponse.json({ ok: true });
    const maxAge = resolveMaxAge(token);
    res.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      ...(maxAge ? { maxAge } : {}),
    });
    return res;
  } catch (error) {
    console.error('Failed to persist auth session', error);
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }
}
