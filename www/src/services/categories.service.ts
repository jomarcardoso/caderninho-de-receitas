import { fetchApiJson } from '@/lib/api-server';

export type CategoryText = { en: string; pt: string };
export type CategoryItem = {
  key: string;
  url: string;
  text: CategoryText;
  pluralText: CategoryText;
  img: string;
  description?: CategoryText;
  bannerImg?: string;
};

export async function getCategories(): Promise<CategoryItem[]> {
  try {
    const data = await fetchApiJson<any>(`/api/Recipe/categories`, { cache: 'no-store' });
    if (Array.isArray(data)) return data as CategoryItem[];
    // If backend still returns a map, degrade gracefully to empty (or map to list in future)
    return [];
  } catch {
    return [];
  }
}
