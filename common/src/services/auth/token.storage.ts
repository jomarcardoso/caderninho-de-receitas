const TOKEN_KEY = 'caderninho:auth-token';
let memoryToken: string | null = null;

export function setAuthToken(token: string | null): void {
  memoryToken = token;
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    } else {
      window.localStorage.removeItem(TOKEN_KEY);
    }
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    return window.localStorage.getItem(TOKEN_KEY);
  }
  return memoryToken;
}

export function clearAuthToken(): void {
  setAuthToken(null);
}

export function decodeTokenPayload<T = Record<string, unknown>>(): T | null {
  const token = getAuthToken();
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=');
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

export function appendAuthHeader(headers: Headers): void {
  const token = getAuthToken();
  if (token) headers.set('Authorization', `Bearer ${token}`);
}
