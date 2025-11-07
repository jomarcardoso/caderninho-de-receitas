import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchRecipeData, fetchRecipes } from '@common/services/recipe';
import { KitchenPageView } from '../page.view';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const num = Number(id);
  const data = Number.isFinite(num) ? await fetchRecipeData(num) : null;
  return {
    title: data?.recipe?.name ?? 'Kitchen',
    description: data?.recipe?.description ?? undefined,
  };
}

export default async function KitchenRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const data = await fetchRecipes();
  const recipes = data.recipes;
  const recipeLists = data.recipeLists ?? [];
}
