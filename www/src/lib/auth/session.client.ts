'use client';

let inFlight: Promise<void> | null = null;

export async function syncAuthSession(token: string | null): Promise<void> {
  if (typeof window === 'undefined') return;

  const run = async () => {
    try {
      if (!token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          cache: 'no-store',
        });
        return;
      }

      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({ token }),
      });
    } catch {
      // best-effort
    }
  };

  if (!inFlight) {
    inFlight = run().finally(() => {
      inFlight = null;
    });
  }

  await inFlight;
}
