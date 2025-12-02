import { appendAuthHeader } from '@common/services/auth/token.storage';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';

function apiBase(): string {
  const base =
    (process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      process.env.RECIPES_API_URL ||
      '') as string;
  return (base || DEFAULT_API_BASE_URL).replace(/\/$/, '');
}

function withAuth(init?: RequestInit): RequestInit {
  const headers = new Headers(init?.headers as HeadersInit | undefined);
  appendAuthHeader(headers);
  return { ...(init ?? {}), headers };
}

async function handleJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export type PendingCategoryEdit = {
  id: number;
  categoryId: number;
  proposedBy: string;
  payload: string;
  createdAt: string;
};

export async function submitCategoryEdit(
  categoryId: number,
  payload: any,
): Promise<boolean> {
  const res = await fetch(
    `${apiBase()}/api/category-edits`,
    withAuth({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId, payload }),
    }),
  );
  await handleJson<any>(res);
  return true;
}

export async function fetchPendingCategoryEdits(): Promise<PendingCategoryEdit[]> {
  const res = await fetch(`${apiBase()}/api/category-edits/pending`, withAuth());
  return handleJson<PendingCategoryEdit[]>(res);
}

export async function approveCategoryEdit(id: number): Promise<void> {
  const res = await fetch(
    `${apiBase()}/api/category-edits/${id}/approve`,
    withAuth({ method: 'POST' }),
  );
  await handleJson(res);
}

export async function rejectCategoryEdit(id: number): Promise<void> {
  const res = await fetch(
    `${apiBase()}/api/category-edits/${id}/reject`,
    withAuth({ method: 'POST' }),
  );
  await handleJson(res);
}
