// Shared utilities to manage the unified owner cookie on the web client

export function getOwnerIdFromCookies(): string | undefined {
  try {
    if (typeof document === 'undefined' || typeof document.cookie !== 'string') return undefined;
    const cookies = document.cookie.split(';').map((s) => s.trim());
    const owner = cookies.find((s) => s.startsWith('ownerId='));
    if (owner) {
      const v = decodeURIComponent(owner.split('=')[1] || '');
      if (v && v.trim()) return v.trim();
    }
  } catch {}
  return undefined;
}

function getAuthBase(): string {
  try {
    const fromEnv = (process as any)?.env?.NEXT_PUBLIC_API_BASE_URL as string | undefined;
    if (fromEnv && typeof fromEnv === 'string' && fromEnv.trim()) return fromEnv.replace(/\/$/, '');
  } catch {}
  return 'http://localhost:5106';
}

export async function ensureOwnerCookie(): Promise<void> {
  try {
    if (typeof window === 'undefined') return; // SSR no-op
    if (document.cookie.includes('ownerId=')) return;
    const base = getAuthBase();
    await fetch(`${base}/api/auth/ensure-owner`, {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
  } catch {}
}

