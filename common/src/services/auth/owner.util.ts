import { decodeTokenPayload } from './token.storage';

export function getOwnerIdFromCookies(): string | undefined {
  try {
    const payload = decodeTokenPayload<Record<string, any>>();
    const owner = payload?.sub ?? payload?.nameid;
    if (typeof owner === 'string' && owner.trim()) return owner.trim();
  } catch {
    // ignore
  }
  return undefined;
}

export async function ensureOwnerCookie(): Promise<void> {
  // Legacy no-op: owner tracking now relies on bearer token claims
}
