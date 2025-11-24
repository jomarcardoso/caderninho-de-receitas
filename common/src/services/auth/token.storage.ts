const TOKEN_KEY = 'caderninho:auth-token';
let memoryToken: string | null = null;
const subscribers = new Set<(token: string | null) => void>();

function notify(token: string | null): void {
  for (const listener of subscribers) {
    try {
      listener(token);
    } catch {
      // ignore subscriber errors
    }
  }
}

export function subscribeAuthToken(
  listener: (token: string | null) => void,
): () => void {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export function setAuthToken(token: string | null): void {
  memoryToken = token;
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined'
  ) {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  }
  notify(token);
}

export function getAuthToken(): string | null {
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined'
  ) {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  return memoryToken;
}

export function clearAuthToken(): void {
  setAuthToken(null);
}

export function decodeTokenPayload<T = Record<string, unknown>>(
  tokenOverride?: string | null,
): T | null {
  const token =
    typeof tokenOverride === 'string' ? tokenOverride : getAuthToken();
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      '=',
    );
    const json =
      typeof atob === 'function'
        ? atob(padded)
        : typeof Buffer !== 'undefined'
          ? Buffer.from(padded, 'base64').toString('utf8')
          : '';
    if (!json) return null;
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function getTokenExpiration(token?: string | null): number | null {
  const payload = decodeTokenPayload<{ exp?: number }>(
    typeof token === 'string' ? token : undefined,
  );
  if (!payload?.exp) return null;
  return payload.exp * 1000;
}

export function appendAuthHeader(headers: Headers): void {
  const token = getAuthToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
}
