const FALLBACK_BASES = ['https://localhost:7269', 'http://localhost:5106'];

const trimBase = (base?: string | null): string | undefined => {
  if (!base || typeof base !== 'string') return undefined;
  const trimmed = base.trim();
  return trimmed ? trimmed.replace(/\/$/, '') : undefined;
};

export function getApiBase(): string {
  const vite =
    (typeof import.meta !== 'undefined' &&
      (import.meta as any)?.env?.VITE_API_BASE_URL) ??
    undefined;
  const next =
    (typeof process !== 'undefined' &&
      (process.env as any)?.NEXT_PUBLIC_API_BASE_URL) ??
    undefined;

  return trimBase(vite) ?? trimBase(next) ?? FALLBACK_BASES[1];
}

export function getApiBases(): string[] {
  const bases = new Set<string>();
  const add = (candidate?: string | null) => {
    const trimmed = trimBase(candidate);
    if (trimmed) bases.add(trimmed);
  };

  add(
    (typeof import.meta !== 'undefined' &&
      (import.meta as any)?.env?.VITE_API_BASE_URL) as string | undefined,
  );
  add(
    (typeof process !== 'undefined' &&
      (process.env as any)?.NEXT_PUBLIC_API_BASE_URL) as string | undefined,
  );

  try {
    if (typeof window !== 'undefined') {
      const isHttps = window.location?.protocol === 'https:';
      if (isHttps) {
        add('https://localhost:7269');
        add('http://localhost:5106');
      } else {
        add('http://localhost:5106');
        add('https://localhost:7269');
      }
    }
  } catch {
    // ignore window access errors (e.g., SSR)
  }

  for (const fallback of FALLBACK_BASES) add(fallback);

  return Array.from(bases);
}
