import '../../page.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type RecipeStep = {
  title?: string;
  preparation?: string;
  additional?: string;
  ingredientsText?: string;
};

type RecipeApi = {
  id?: number;
  name?: string;
  description?: string;
  additional?: string;
  steps?: RecipeStep[];
};

const API_BASE_URL =
  process.env.RECIPES_API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5106';

async function fetchRecipeById(id: string): Promise<RecipeApi | null> {
  try {
    const base = API_BASE_URL.replace(/\/$/, '');
    const res = await fetch(`${base}/api/Recipe/public/${id}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as RecipeApi;
    return data ?? null;
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
  const recipe = await fetchRecipeById(id);
  if (!recipe) return { title: 'Receita não encontrada' };
  return {
    title: recipe.name ?? 'Receita',
    description: recipe.description ?? undefined,
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);
  if (!recipe) notFound();

  return (
    <div className="page theme-light">
      <article className="card" style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ margin: 0 }}>{recipe.name}</h1>
        {recipe.description && (
          <p className="description" style={{ marginTop: '0.75rem' }}>
            {recipe.description}
          </p>
        )}
        {recipe.additional && <p>{recipe.additional}</p>}

        {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
          <section className="steps">
            <h3>Modo de preparo</h3>
            <ol>
              {recipe.steps.map((step, idx) => (
                <li key={idx}>
                  {step.title && <strong>{step.title}</strong>}
                  {step.ingredientsText && (
                    <pre className="ingredients">{step.ingredientsText}</pre>
                  )}
                  {step.preparation && <p>{step.preparation}</p>}
                  {step.additional && <p>{step.additional}</p>}
                </li>
              ))}
            </ol>
          </section>
        )}
      </article>
    </div>
  );
}
