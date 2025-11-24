import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/lib/auth/constants';

export async function POST() {
  const res = new NextResponse(null, { status: 200 });
  res.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    maxAge: 0,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    path: '/',
  });
  return res;
}
