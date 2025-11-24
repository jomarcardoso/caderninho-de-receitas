import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

function getApiBase(): string {
  return (API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (
      typeof body?.foodId !== 'number' ||
      typeof body?.payload !== 'object' ||
      body.payload === null
    ) {
      return NextResponse.json(
        { error: 'Payload inválido para edição de alimento.' },
        { status: 400 },
      );
    }

    const upstream = await fetch(`${getApiBase()}/api/food-edits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') ?? '',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const responseBody = await upstream.text();
    const headers = new Headers();
    const contentType = upstream.headers.get('content-type');
    if (contentType) headers.set('content-type', contentType);
    const setCookie = upstream.headers.get('set-cookie');
    if (setCookie) headers.set('set-cookie', setCookie);

    return new NextResponse(responseBody, {
      status: upstream.status,
      headers,
    });
  } catch (error) {
    console.error('Failed to proxy food edit', error);
    return NextResponse.json(
      { error: 'Falha ao encaminhar solicitação de edição.' },
      { status: 500 },
    );
  }
}

