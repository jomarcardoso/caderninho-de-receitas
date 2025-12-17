function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

export interface FoodIconSearchItem {
  id?: number;
  name: string;
  url?: string; // public URL or inline svg/base64
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

export interface FoodIconByIdEntry { url?: string }

export interface FoodIconEntry {
  id: number;
  name: { en: string; pt?: string };
  url: string;
  keys?: { en?: string; pt?: string };
}

export async function fetchFoodIcons(): Promise<FoodIconEntry[]> {
  try {
    const res = await fetch(`${getApiBase()}/api/food-icons/all`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data as FoodIconEntry[];
  } catch {
    return [];
  }
}

export async function updateFoodIcon(
  id: number,
  payload: { name?: string; url?: string; keys?: { en?: string; pt?: string } },
): Promise<boolean> {
  if (!id || id <= 0) return false;
  try {
    const res = await fetch(`${getApiBase()}/api/food-icons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getFoodIconsMapById(ids: number[]): Promise<Record<number, FoodIconByIdEntry>> {
  if (!Array.isArray(ids) || ids.length === 0) return {};

  const base = getApiBase();
  const url = `${base}/api/food-icons/map-by-id?ids=${encodeURIComponent(ids.join(','))}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return {} as any;
    return (await res.json()) as Record<number, FoodIconByIdEntry>;
  } catch {
    return {} as any;
  }
}
