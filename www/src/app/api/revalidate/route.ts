import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({} as any));
    const input = payload?.tags ?? payload?.tag ?? [];
    const tags: string[] = Array.isArray(input) ? input : (typeof input === 'string' ? [input] : []);
    for (const tag of tags) {
      try { revalidateTag(tag); } catch {}
    }
    return new Response(JSON.stringify({ revalidated: true, tags }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ revalidated: false, error: 'invalid-payload' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

