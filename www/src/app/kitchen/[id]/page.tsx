import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchRecipeData, mapRecipeModelToDto } from '@common/services/recipe';
import type { RecipeDto } from '@common/services/recipe';
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
  const { id } = await params;
  const num = Number(id);
  if (!Number.isFinite(num)) notFound();
  const data = await fetchRecipeData(num);
  if (!data?.recipe) notFound();
  const recipeToEdit: RecipeDto = mapRecipeModelToDto(data.recipe);
  return <KitchenPageView recipeToEdit={recipeToEdit} />;
}
