import { Recipe } from '@common/services/recipe';
import './page.scss';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionCard } from 'notebook-layout';
import SideMenu from '@/components/SideMenu';
import ClientRecipeDetails from '@/components/RecipeDetails.client';

const API_BASE_URL =
  process.env.RECIPES_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'http://localhost:5106';

type RecipeWithRelated = {
  recipe: Recipe;
  related: Recipe[];
  foodIcons?: Record<string, string>;
};

async function fetchRecipeById(id: string): Promise<RecipeWithRelated | null> {
  try {
    const base = API_BASE_URL.replace(/\/$/, '');
    const res = await fetch(`${base}/api/Recipe/public/${id}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return null;
    }

    const raw = (await res.json()) as any;
    if (!raw) return null;

    if (raw.recipe) {
      return {
        recipe: raw.recipe as Recipe,
        related: (raw.related as Recipe[]) ?? [],
        foodIcons: (raw.foodIcons as Record<string, string>) ?? undefined,
      };
    }

    // Backward-compat: API returned a plain Recipe
    return {
      recipe: raw as Recipe,
      related: [],
      foodIcons: (raw.foodIcons as Record<string, string>) ?? undefined,
    };
  } catch (err) {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchRecipeById(id);
  if (!data) return { title: 'Receita não encontrada' };
  return {
    title: data.recipe.name ?? 'Receita',
    description: data.recipe.description ?? undefined,
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await fetchRecipeById(id);
  if (!data) notFound();

  const { recipe, related, foodIcons } = data;

  console.log('foodIcons', foodIcons);

  return (
    <div className="page page-recipe theme-light">
      <div className="row">
        <div className="col-md-3 col-lg-4"></div>

        <main className="col-md-7 col-lg-5">
          <h1 className="h1 mb-3">{recipe.name}</h1>

          <SectionCard>
            <img
              className="img-primary"
              src={recipe?.image || recipe?.food.image}
            />
          </SectionCard>

          <ClientRecipeDetails recipe={recipe} foodIcons={foodIcons} />
        </main>

        <div className="col-md-2 col-lg-3">
          <SideMenu />
        </div>
      </div>
    </div>
  );
}
