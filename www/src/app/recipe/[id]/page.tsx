import type { RecipeData } from '@common/services/recipe';
import { fetchRecipeData } from '@common/services/recipe';
import './page.scss';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
// import { SectionCard } from 'notebook-layout';
// import SideMenu from '@/components/SideMenu';
// import ClientRecipeDetails from '@/components/RecipeDetails.client';
// import FallbackImage from '@/components/FallbackImage.client';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import { NavLink } from '@/components/nav-link/nav-link';
// import { RecipeDetails } from '@common/components';
import { Image2 } from '@/components/image-2/image';
import Link from 'next/link';
import RecipeDeleteButton from '@/components/recipe-delete-button/recipe-delete-button';
import { useHistory } from '@/providers/history/history.provider';
import { RecipePageClient } from './page.client';

async function fetchRecipeById(id: string): Promise<RecipeData | null> {
  const num = Number(id);
  if (!Number.isFinite(num)) return null;
  return await fetchRecipeData(num);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchRecipeById(id);

  if (!data) return { title: 'Receita n�o encontrada' };
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

  const { recipe } = data;

  return (
    <Layout2
      header={<Header2 currentPage="kitchen" />}
      aside={
        <ul>
          {data.relatedRecipes.map((r) => (
            <li key={r.id}>
              <Link href={`/recipe/${r.id}`}>{r.name}</Link>
            </li>
          ))}
        </ul>
      }
      navbar={
        <Navbar>
          <NavLink action="pop">
            <ion-icon name="arrow-back-outline" />
            página <br /> anterior
          </NavLink>

          <Link href={`/kitchen/${recipe.id}`}>
            <ion-icon name="create-outline" />
            editar <br /> receita
          </Link>

          <button type="button" aria-label="Compartilhar" title="Compartilhar">
            <ion-icon md="share-outline" />
            enviar <br /> receita
          </button>

          <RecipeDeleteButton id={recipe.id} />
        </Navbar>
      }
    >
      <main className="theme-light">
        <div className="recipe-page">
          {recipe?.name && (
            <div
              // data-ovo-sticky-header
              style={{
                position: 'sticky',
                top: 0,
                right: 0,
                width: '100%',
                zIndex: 1,
              }}
            >
              <div className="recipe-page__name">
                <h1
                  className="h2"
                  style={{
                    fontSize: recipe.name.length > 30 ? 17 : 19,
                  }}
                >
                  {recipe.name}
                </h1>
              </div>
            </div>
          )}
          <div style={{ marginBottom: '24px' }}>
            <Image2
              srcs={[...(recipe?.imgs ?? []), ...(recipe?.food?.imgs ?? [])]}
              alt=""
              aspectRatio={1.25}
            />
          </div>
          <div className="recipe-page__body">
            <RecipePageClient recipe={recipe} />
          </div>
        </div>
      </main>
    </Layout2>
  );
}
