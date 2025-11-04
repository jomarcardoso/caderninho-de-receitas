import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchRecipes } from '@common/services/recipe';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchRecipes();
  const num = Number(id);
  const recipe = data.recipes.find((r) => r.id === num);
  return {
    title: recipe?.name ?? 'Kitchen',
    description: recipe?.description ?? undefined,
  };
}

export default async function KitchenRecipePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const data = await fetchRecipes();
  const num = Number(id);
  const recipe = data.recipes.find((r) => r.id === num);

  if (!recipe) notFound();

  return (
    <main className="container" style={{ padding: 24 }}>
      <h1 className="h2" style={{ marginBottom: 8 }}>{recipe.name}</h1>
      {recipe.description && (
        <p style={{ opacity: 0.85, marginBottom: 16 }}>{recipe.description}</p>
      )}
      <div style={{ fontSize: 13, opacity: 0.7 }}>
        <span>Receita #{recipe.id}</span>
      </div>
    </main>
  );
}

