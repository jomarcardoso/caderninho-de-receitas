import type { Metadata } from 'next';
import { fetchRecipes } from '@common/services/recipe';
import { MyRecipesViewWithData } from './page.client';

export const metadata: Metadata = {
  title: 'Minhas listas de receitas',
};

export default async function MyRecipesPage() {
  const data = await fetchRecipes();

  return <MyRecipesViewWithData data={data} />;
}
