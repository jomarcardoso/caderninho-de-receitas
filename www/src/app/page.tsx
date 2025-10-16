import Image from 'next/image';
import './page.css';
import type { Metadata } from 'next';
import type { RecipeDto } from '@common/services/recipe';
import type { RecipeStepDto } from '@common/services/recipe-step';
import { fetchMostCopiedRecipes } from '@common/services/recipe';
import type { Language } from '@common/services/language/language.types';
import Link from 'next/link';
import { SectionCard } from 'notebook-layout';

const API_BASE_URL =
  process.env.RECIPES_API_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

const FALLBACK_RECIPES: RecipeDto[] = [
  {
    id: 1,
    language: 'pt' satisfies Language,
    name: 'Bolo de Cenoura macio',
    description:
      'Clássico bolo de cenoura com cobertura de chocolate, perfeito para acompanhar o café da tarde.',
    additional: 'Rende uma forma média.',
    steps: [
      {
        title: 'Ingredientes',
        preparation:
          'Bata no liquidificador a cenoura, os ovos e o óleo até obter um creme homogêneo.',
        additional: 'Dica: use cenouras pequenas para um sabor mais adocicado.',
        ingredientsText:
          '3 cenouras médias raladas\n3 ovos\n1 xícara de óleo\n2 xícaras de açúcar\n2 e 1/2 xícaras de farinha de trigo\n1 colher de sopa de fermento',
      },
      {
        title: 'Cobertura',
        preparation:
          'Leve ao fogo a manteiga, o chocolate em pó, o leite e o açúcar, mexendo até engrossar. Cubra o bolo ainda morno.',
        additional: 'Finalize com granulado ou raspas de chocolate.',
        ingredientsText:
          '2 colheres de sopa de manteiga\n5 colheres de sopa de chocolate em pó\n1 xícara de açúcar\n1/2 xícara de leite',
      },
    ],
  },
  {
    id: 2,
    language: 'pt' satisfies Language,
    name: 'Salada fresca de grão-de-bico',
    description:
      'Salada nutritiva com grão-de-bico, legumes e molho cítrico para refeições rápidas.',
    additional: 'Ideal para levar na marmita.',
    steps: [
      {
        title: 'Preparo',
        preparation:
          'Misture o grão-de-bico cozido com tomate, pepino, cebola roxa e salsinha. Tempere com azeite, limão, sal e pimenta-do-reino.',
        additional: 'Sirva gelada para realçar os sabores.',
        ingredientsText:
          '2 xícaras de grão-de-bico cozido\n1 tomate em cubos\n1/2 pepino em cubos\n1/2 cebola roxa fatiada\nSalsinha picada\nSuco de 1 limão\nAzeite, sal e pimenta a gosto',
      },
    ],
  },
];

async function fetchRecipes(): Promise<RecipeDto[]> {
  const mostCopied = await fetchMostCopiedRecipes(6, API_BASE_URL);
  return mostCopied.length ? mostCopied : FALLBACK_RECIPES;
}

export const metadata: Metadata = {
  title: 'Caderninho de Receitas',
  description:
    'Descubra receitas práticas e deliciosas para o dia a dia. Tudo organizado no seu caderninho digital.',
};

export default async function Home() {
  const recipes = await fetchRecipes();

  return (
    <div className="page theme-light">
      <header className="hero">
        <Image
          className="logo"
          src="/vercel.svg"
          alt="Caderninho de Receitas"
          width={72}
          height={72}
          priority
        />
        <h1>Caderninho de Receitas</h1>
        <p>
          Uma seleção de receitas preparadas com carinho para inspirar o seu
          próximo prato. Tudo pronto para ser compartilhado.
        </p>
      </header>

      <section className="grid">
        {recipes.map((recipe) => (
          <Link href={`/recipe/${recipe.id}`}>
            <article key={recipe.id} className="card">
              <SectionCard title={recipe.name}>
                {recipe.description && (
                  <p className="description">{recipe.description}</p>
                )}

                {recipe.steps.length > 0 && (
                  <div className="steps">
                    <h3>Modo de preparo</h3>
                    <ol>
                      {recipe.steps.map((step, index) => (
                        <li key={index}>
                          {step.title && <strong>{step.title}</strong>}
                          {step.ingredientsText && (
                            <pre className="ingredients">
                              {step.ingredientsText}
                            </pre>
                          )}
                          <p>{step.preparation}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </SectionCard>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}
