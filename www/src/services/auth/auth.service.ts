import type {
  GoogleLoginResponse as SharedGoogleLoginResponse,
  GoogleLoginSuccess as SharedGoogleLoginSuccess,
} from '@common/services/auth/auth.service';

export type GoogleLoginResponse = SharedGoogleLoginResponse;
export type GoogleLoginSuccess = SharedGoogleLoginSuccess;

interface GoogleLoginErrorResponse {
  error?: string;
}

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

// Simple in-memory cache to avoid repeated /api/me fetches on client
let meCache: MeResponse | null | undefined;
let meInflight: Promise<MeResponse | null> | null = null;

export function resetMeCache(): void {
  meCache = undefined;
  meInflight = null;
}

async function parseError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as GoogleLoginErrorResponse;
    return payload.error ?? response.statusText;
  } catch (error) {
    return response.statusText;
  }
}

export async function authenticateWithGoogle(
  idToken: string,
): Promise<GoogleLoginSuccess> {
  const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message || 'Failed to authenticate with Google.');
  }

  return (await response.json()) as GoogleLoginSuccess;
}

export interface MeResponse {
  displayName: string;
  email: string;
  picture: string;
  roles: string[];
}

export async function fetchMe(): Promise<MeResponse | null> {
  // On the web app, prefer the Next.js proxy to ensure cookies flow and reduce CORS issues
  if (typeof window !== 'undefined') {
    if (meCache !== undefined) return meCache ?? null;
    if (meInflight) return meInflight;
    meInflight = (async () => {
      try {
        const response = await fetch('/api/me', {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
        if (!response.ok) {
          meCache = null;
          return null;
        }
        const data = (await response.json()) as MeResponse;
        meCache = data ?? null;
        return meCache;
      } catch {
        meCache = null;
        return null;
      } finally {
        meInflight = null;
      }
    })();
    return meInflight;
  }

  // For server-side usages, call the backend directly (no client cache)
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    return (await response.json()) as MeResponse;
  } catch {
    return null;
  }
}

export async function hasKeeperPermission(): Promise<boolean> {
  const me = await fetchMe();
  if (!me) return false;
  const roles = (me.roles || []).map((r) => r.toLowerCase());
  return (
    roles.includes('keeper') ||
    roles.includes('admin') ||
    roles.includes('owner')
  );
}

export async function hasAdminPermission(): Promise<boolean> {
  const me = await fetchMe();
  const roles = (me?.roles || []).map((r) => r.toLowerCase());
  return (
    roles.includes('admin') ||
    roles.includes('owner') ||
    roles.includes('keeper')
  );
}
