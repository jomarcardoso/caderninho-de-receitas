import { httpRequest } from '../http/http-client';

export type CategoryText = { en: string; pt: string };
export type CategoryItem = {
  key: string; // camelCase
  url: string; // kebab-case for links
  text: CategoryText;
  pluralText: CategoryText;
  img: string; // relative path
};

function getBase(): string {
  const env = (typeof process !== 'undefined' && (process.env as any)?.NEXT_PUBLIC_API_BASE_URL) as string | undefined;
  const base = (env || 'http://localhost:5106').toString().trim();
  return base.replace(/\/$/, '');
}

export async function fetchCategories(
  baseUrl?: string,
): Promise<CategoryItem[]> {
  const base = (baseUrl || getBase()).replace(/\/$/, '');
  try {
    const res = await httpRequest<CategoryItem[]>({
      url: `${base}/api/recipe/categories`,
      method: 'GET',
      skipAuth: true,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch {
    return [];
  }
}
