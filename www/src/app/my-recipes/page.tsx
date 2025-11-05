import type { Metadata } from 'next';
import { mapRecipesDataResponseToModel } from '@common/services/recipe';
import { cookies } from 'next/headers';
import { MyRecipesViewWithData } from './page.client';

export const metadata: Metadata = {
  title: 'Minhas listas de receitas',
};

export default async function MyRecipesPage() {
  const cookieStore = cookies();
  const gid = cookieStore.get('x-temp-owner')?.value;
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7269').replace(/\/$/, '');
  let data;
  try {
    const res = await fetch(`${apiBase}/api/recipe`, {
      headers: {
        ...(gid ? { 'X-Temporary-Owner': gid } : {}),
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed');
    const json = await res.json();
    data = mapRecipesDataResponseToModel(json);
  } catch {
    // Fallback to HTTP in dev if HTTPS blocked
    try {
      const httpBase = (process.env.NEXT_PUBLIC_API_BASE_URL_HTTP || 'http://localhost:5106').replace(/\/$/, '');
      const res2 = await fetch(`${httpBase}/api/recipe`, {
        headers: {
          ...(gid ? { 'X-Temporary-Owner': gid } : {}),
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      if (!res2.ok) throw new Error('Failed');
      const json2 = await res2.json();
      data = mapRecipesDataResponseToModel(json2);
    } catch {
      data = { recipes: [], foods: [], foodIcons: [], recipeLists: [], measures: {}, foodTypes: {}, measurementUnits: {}, vitamins: {}, aminoAcids: {}, minerals: {}, nutritionalInformation: {} } as any;
    }
  }

  return <MyRecipesViewWithData data={data} initialData={data} />;
}
