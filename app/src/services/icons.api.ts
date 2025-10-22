function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

export interface FoodIconSearchItem {
  name: string;
  mediaType?: string;
}

export async function searchFoodIcons(q = '', limit = 25): Promise<FoodIconSearchItem[]> {
  try {
    const url = new URL(`${getApiBase()}/api/food-icons/search`);
    if (q) url.searchParams.set('q', q);
    url.searchParams.set('limit', String(limit));
    const res = await fetch(url.toString(), { headers: { 'Content-Type': 'application/json' } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data as FoodIconSearchItem[];
  } catch {
    return [];
  }
}

export async function getFoodIconsMap(names: string[]): Promise<Record<string, string>> {
  if (!Array.isArray(names) || names.length === 0) return {};
  const base = getApiBase();
  const url = `${base}/api/food-icons/map?names=${encodeURIComponent(names.join(','))}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return {};
    return (await res.json()) as Record<string, string>;
  } catch {
    return {};
  }
}