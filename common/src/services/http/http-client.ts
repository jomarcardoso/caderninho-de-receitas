import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  clearAuthToken,
  getAuthToken,
  getTokenExpiration,
  setAuthToken,
} from '../auth/token.storage';
import { getApiBase } from './api-base';

const authHttp: AxiosInstance = axios.create();
const rawHttp: AxiosInstance = axios.create();

const REFRESH_THRESHOLD_MS = 60_000; // 1 minute
let refreshPromise: Promise<string | null> | null = null;

type ExtendedConfig<T = any> = InternalAxiosRequestConfig<T> & {
  skipAuth?: boolean;
  _retry?: boolean;
};

async function refreshAccessToken(currentToken: string): Promise<string | null> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      try {
        const response = await rawHttp.post<{ token?: string }>(
          `${getApiBase()}/api/auth/refresh`,
          null,
          {
            headers: { Authorization: `Bearer ${currentToken}` },
          },
        );
        const nextToken = response.data?.token;
        if (nextToken) {
          setAuthToken(nextToken);
          return nextToken;
        }
        clearAuthToken();
        return null;
      } catch {
        clearAuthToken();
        return null;
      } finally {
        refreshPromise = null;
      }
    })();
  }
  return refreshPromise;
}

function shouldRefresh(token: string): boolean {
  const expiration = getTokenExpiration(token);
  if (!expiration) return false;
  const remaining = expiration - Date.now();
  return remaining <= REFRESH_THRESHOLD_MS;
}

authHttp.interceptors.request.use(async (config) => {
  const extended = config as ExtendedConfig;
  if (!extended.skipAuth) {
    const token = getAuthToken();
    if (token && shouldRefresh(token)) {
      await refreshAccessToken(token);
    }
    const freshToken = getAuthToken();
    if (freshToken) {
      extended.headers = {
        ...(extended.headers ?? {}),
        Authorization: `Bearer ${freshToken}`,
        Accept: extended.headers?.Accept ?? 'application/json',
      };
    }
  }
  return extended;
});

authHttp.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { response, config } = error;
    const extended = config as ExtendedConfig | undefined;
    if (
      response?.status === 401 &&
      extended &&
      !extended.skipAuth &&
      !extended._retry
    ) {
      extended._retry = true;
      const currentToken = getAuthToken();
      if (currentToken) {
        const refreshed = await refreshAccessToken(currentToken);
        if (refreshed) {
          extended.headers = {
            ...(extended.headers ?? {}),
            Authorization: `Bearer ${refreshed}`,
          };
          return authHttp(extended);
        }
      }
    }
    return Promise.reject(error);
  },
);

export type AuthenticatedRequestConfig<T = any> = AxiosRequestConfig<T> & {
  skipAuth?: boolean;
};

export async function httpRequest<T = any>(
  config: AuthenticatedRequestConfig<T>,
) {
  return authHttp.request<T>(config);
}

export { authHttp };
