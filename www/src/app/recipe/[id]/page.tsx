import { Recipe } from '@common/services/recipe';
import '../../page.css';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectionCard } from 'notebook-layout';

const API_BASE_URL =
  process.env.RECIPES_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'http://localhost:5106';

async function fetchRecipeById(id: string): Promise<Recipe | null> {
  try {
    const base = API_BASE_URL.replace(/\/$/, '');
    const res = await fetch(`${base}/api/Recipe/public/${id}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      return null;
    }

    const data = (await res.json()) as Recipe;
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
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>

          <div className="col-md-7">
            <h1 className="h1 mb-3">{recipe.name}</h1>

            <SectionCard>
              <article
                className="card"
                style={{ maxWidth: 960, margin: '0 auto' }}
              >
                <img
                  className="img-primary"
                  src={recipe?.image || recipe?.food.image}
                />

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
                            <pre className="ingredients">
                              {step.ingredientsText}
                            </pre>
                          )}
                          {step.preparation && <p>{step.preparation}</p>}
                          {step.additional && <p>{step.additional}</p>}
                        </li>
                      ))}
                    </ol>
                  </section>
                )}
              </article>
            </SectionCard>
          </div>

          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}
