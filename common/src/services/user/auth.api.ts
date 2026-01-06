import { getApiBase } from '../http/api-base';
import { httpRequest } from '../http/http-client';
import type { User } from './user.model';

const API_BASE = () => `${getApiBase()}/api/auth`;

export async function loginWithGoogle(idToken: string): Promise<User> {
  const res = await httpRequest<User>({
    url: `${API_BASE()}/google`,
    method: 'POST',
    data: { idToken },
    skipAuth: true,
  });
  return res.data;
}

export async function refreshToken(): Promise<{ token: string }> {
  const res = await httpRequest<{ token: string }>({
    url: `${API_BASE()}/refresh`,
    method: 'POST',
  });
  return res.data;
}

export async function logout(): Promise<void> {
  await httpRequest<void>({
    url: `${API_BASE()}/logout`,
    method: 'POST',
  });
}
