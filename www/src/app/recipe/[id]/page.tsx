import { CiCircleChevLeft, CiEdit } from 'react-icons/ci';
import type { RecipeData } from '@common/services/recipe';
import { mapRecipeDataResponseToModel } from '@common/services/recipe';
import { fetchApiJson } from '@/lib/api-server';
import './page.scss';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import { NavLink } from '@/components/nav-link/nav-link';
import { Image2 } from '@/components/image-2/image';
import Link from 'next/link';
import RecipeDeleteButton from '@/components/recipe-delete-button/recipe-delete-button';
import { RecipePageClient } from './page.client';
import { ShareRecipeAction } from './share-action.client';

async function fetchRecipeByHandle(handle: string): Promise<RecipeData | null> {
  try {
    const num = Number(handle);
    if (Number.isFinite(num)) {
      const raw = await fetchApiJson<any>(`/api/Recipe/${num}`, {
        cache: 'no-store',
      });
      if (raw && typeof raw === 'object')
        return mapRecipeDataResponseToModel(raw as any);
      return null;
    }
    const raw = await fetchApiJson<any>(
      `/api/share/recipe/${encodeURIComponent(handle)}/data`,
      { cache: 'no-store' },
    );
    if (raw && typeof raw === 'object')
      return mapRecipeDataResponseToModel(raw as any);
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchRecipeByHandle(id);

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
  const data = await fetchRecipeByHandle(id);
  if (!data?.recipe) notFound();

  const { recipe } = data;

  return (
    <Layout2
      header={<Header2 />}
      aside={
        <ul>
          {(data.relatedRecipes ?? []).map((r) => (
            <li key={r.id}>
              <Link href={`/recipe/${r.id}`}>{r.name}</Link>
            </li>
          ))}
        </ul>
      }
      navbar={
        <Navbar>
          <NavLink action="pop">
            <CiCircleChevLeft className="svg-icon" />
            página <br /> anterior
          </NavLink>

          <Link href={`/kitchen/${recipe.id}`}>
            <CiEdit className="svg-icon" />
            editar <br /> receita
          </Link>

          <ShareRecipeAction recipeId={recipe.id} recipe={recipe} />

          <RecipeDeleteButton id={recipe.id} />
        </Navbar>
      }
    >
      <main className="theme-light">
        <div className="recipe-page">
          {recipe?.name && (
            <div
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
                  style={{ fontSize: recipe.name.length > 30 ? 17 : 19 }}
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
