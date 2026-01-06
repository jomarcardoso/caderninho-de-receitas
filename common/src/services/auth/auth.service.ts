import type { UserProfileOwner } from '../user/user.model';
import {
  appendAuthHeader,
  decodeTokenPayload,
  getAuthToken,
} from './token.storage';

export interface GoogleLoginSuccess {
  token: string;
  user: UserProfileOwner;
}

interface GoogleLoginErrorResponse {
  error?: string;
}

const DEFAULT_API_BASE_URL = 'http://localhost:5106';
const API_BASE_URL =
  import.meta.env.VITE_SERVER_URL ??
  import.meta.env.VITE_API_BASE_URL ??
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

export async function fetchMe(): Promise<UserProfileOwner | null> {
  const token = getAuthToken();
  const payload = decodeTokenPayload<{ nameid?: string; sub?: string }>(token);
  const ownerId = (payload?.nameid || payload?.sub || '').trim() || undefined;
  if (!ownerId) return null;

  try {
    const headers = new Headers({ Accept: 'application/json' });
    appendAuthHeader(headers);
    const response = await fetch(
      `${API_BASE_URL}/api/userprofile/${encodeURIComponent(ownerId)}`,
      {
        method: 'GET',
        headers,
      },
    );
    if (!response.ok) return null;
    return (await response.json()) as UserProfileOwner;
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
    roles.includes('moderator') ||
    roles.includes('admin') ||
    roles.includes('owner')
  );
}
