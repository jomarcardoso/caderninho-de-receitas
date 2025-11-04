export interface GoogleLoginResponse {
  displayName: string;
  email: string;
  picture: string;
  googleId: string;
  emailVerified: boolean;
  roles?: string[];
}

interface GoogleLoginErrorResponse {
  error?: string;
}

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  DEFAULT_API_BASE_URL;

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
): Promise<GoogleLoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
    credentials: 'include',
  });

  if (!response.ok) {
    const message = await parseError(response);
    throw new Error(message || 'Failed to authenticate with Google.');
  }

  return (await response.json()) as GoogleLoginResponse;
}

export interface MeResponse {
  displayName: string;
  email: string;
  picture: string;
  roles: string[];
}

export async function fetchMe(): Promise<MeResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
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

