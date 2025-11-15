import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mapRecipeModelToDto, type RecipeData, mapRecipeDataResponseToModel } from '@common/services/recipe';
import { fetchApiJson } from '@/lib/api-server';
import type { RecipeDto } from '@common/services/recipe';
import { KitchenPageView } from '../page.view';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const num = Number(id);
  const data = Number.isFinite(num)
    ? (() => fetchApiJson<any>(`/api/Recipe/${num}`, { cache: 'no-store' })
        .then((raw) => (raw && typeof raw === 'object' ? mapRecipeDataResponseToModel(raw as any) : null))
        .catch(() => null))()
    : null;
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
  const data = await fetchApiJson<any>(`/api/Recipe/${num}`, { cache: 'no-store' })
    .then((raw) => (raw && typeof raw === 'object' ? mapRecipeDataResponseToModel(raw as any) : null))
    .catch(() => null);
  if (!data?.recipe) notFound();
  const recipeToEdit: RecipeDto = mapRecipeModelToDto(data.recipe);
  return <KitchenPageView recipeToEdit={recipeToEdit} />;
}
