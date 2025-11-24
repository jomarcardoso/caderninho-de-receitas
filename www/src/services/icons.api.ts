const DEFAULT_API_BASE_URL = 'http://localhost:5106';

function getApiBase(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    DEFAULT_API_BASE_URL;
  return (fromEnv || DEFAULT_API_BASE_URL).replace(/\/$/, '');
}

export interface FoodIconSearchItem {
  id?: number;
  name: string;
  mediaType?: string;
  content?: string;
}

export async function searchFoodIcons(
  q = '',
  limit = 25,
): Promise<FoodIconSearchItem[]> {
  try {
    const url = new URL(`${getApiBase()}/api/food-icons/search`);
    if (q) url.searchParams.set('q', q);
    url.searchParams.set('limit', String(limit));
    const res = await fetch(url.toString(), {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? (data as FoodIconSearchItem[]) : [];
  } catch {
    return [];
  }
}

export interface FoodIconByIdEntry {
  mediaType?: string;
  content?: string;
}

export async function getFoodIconsMapById(
  ids: number[],
): Promise<Record<number, FoodIconByIdEntry>> {
  if (!Array.isArray(ids) || ids.length === 0) return {};

  const url = `${getApiBase()}/api/food-icons/map-by-id?ids=${encodeURIComponent(
    ids.join(','),
  )}`;
  try {
    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) return {};
    return (await res.json()) as Record<number, FoodIconByIdEntry>;
  } catch {
    return {};
  }
}

