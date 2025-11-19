import {
  CiCircleChevLeft,
  CiViewList,
  CiCirclePlus,
  CiSearch,
} from 'react-icons/ci';
import { Navbar } from '@/components/navbar/navbar';
import { Header2 } from '@/components/header-2/header-2';
import { Layout2 } from '@/components/layout-2/layout-2';
import Link from 'next/link';
import { NavLink } from '@/components/nav-link/nav-link';
import { Button, Card, Checkbox, Field, SectionCard } from 'notebook-layout';
import capitalize from 'lodash/capitalize';
import { Image2 } from '@/components/image-2/image';
import {
  type RecipesData,
  type RecipesDataResponse,
  RECIPES_DATA,
  mapRecipesDataResponseToModel,
} from '@common/services/recipe';
import { Categories } from '@/components/categories';
import type { CategoryItem } from '@/services/categories.service';
import { getCategories } from '@/services/categories.service';

export const metadata = { title: 'Recipes Search' };

async function fetchCategories(): Promise<CategoryItem[]> {
  return await getCategories();
}

async function searchRecipes(
  text?: string,
  categories?: string[],
  quantity = 20,
) {
  if (!text || !text.trim())
    return { ...RECIPES_DATA, recipes: [] } as RecipesData;
  const base =
    process.env.RECIPES_API_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://localhost:5106';
  const url = new URL('/api/recipe/search', base);
  url.searchParams.set('text', text);
  url.searchParams.set('quantity', String(quantity));
  if (Array.isArray(categories)) {
    for (const c of categories) url.searchParams.append('categories', c);
  }
  try {
    const res = await fetch(url.toString(), { next: { revalidate: 0 } });
    if (!res.ok) return { ...RECIPES_DATA, recipes: [] } as RecipesData;
    const json = (await res.json()) as any;

    // Prefer full RecipesDataResponse from backend when available
    if (
      json &&
      typeof json === 'object' &&
      Array.isArray(json.foods) &&
      Array.isArray(json.recipes)
    ) {
      return mapRecipesDataResponseToModel(json as RecipesDataResponse);
    }

    // If the response is not the expected full shape, fall back to empty data
    return { ...RECIPES_DATA, recipes: [] } as RecipesData;
  } catch {
    return { ...RECIPES_DATA, recipes: [] } as RecipesData;
  }
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?:
    | Promise<{
        text?: string;
        categories?: string | string[];
        quantity?: string;
      }>
    | {
        text?: string;
        categories?: string | string[];
        quantity?: string;
      };
}) {
  const sp: any = await (searchParams as any);
  const query = sp?.text || '';
  const selected = Array.isArray(sp?.categories)
    ? (sp?.categories as string[])
    : typeof sp?.categories === 'string'
    ? [sp?.categories as string]
    : [];
  const quantity = Math.max(
    1,
    Math.min(
      200,
      Number.parseInt(String(sp?.quantity ?? '20')) || 20,
    ),
  );
  const [categories, data] = await Promise.all([
    fetchCategories(),
    searchRecipes(query, selected, quantity),
  ]);
  const recipes = (data as RecipesData).recipes;
  const categoriesList: CategoryItem[] = Array.isArray(categories)
    ? (categories as CategoryItem[])
    : [];
  const categoryMap: Record<
    string,
    { text: { en: string; pt: string }; pluralText: { en: string; pt: string } }
  > = Object.fromEntries(
    categoriesList.map((c) => [
      c.key,
      { text: c.text, pluralText: c.pluralText },
    ]),
  );
  const categoryEntries = Object.entries(categoryMap);
  const selectedLabels = selected.map((k) => categoryMap?.[k]?.text?.pt || k);

  function buildUrl(nextQuantity?: number, omitCategory?: string) {
    const params = new URLSearchParams();
    if (query) params.set('text', query);
    const cats = omitCategory
      ? selected.filter((c) => c !== omitCategory)
      : selected;
    for (const c of cats) params.append('categories', c);
    const qty = typeof nextQuantity === 'number' ? nextQuantity : quantity;
    params.set('quantity', String(qty));
    const qs = params.toString();
    return `/search${qs ? `?${qs}` : ''}`;
  }
  return (
    <form method="get" action="/search">
      <Layout2
        header={<Header2 />}
        navbar={
          <Navbar>
            <NavLink action="pop">
              <CiCircleChevLeft className="svg-icon" />
              página <br /> anterior
            </NavLink>

            <Link href="/my-recipes">
              <CiViewList className="svg-icon" />
              minhas <br /> receitas
            </Link>

            <Link href="/kitchen">
              <CiCirclePlus className="svg-icon" />
              nova <br /> receita
            </Link>
          </Navbar>
        }
        aside={
          categoryEntries.length > 0 && (
            <div className="py-5">
              <h2 className="h2 mb-3">filtros</h2>
              <fieldset>
                <legend className="section-title">Categorias</legend>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {categoryEntries.map(([key, val]) => {
                    const checked = selected.includes(key);
                    return (
                      <label
                        key={key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          border: '1px solid #eee',
                          borderRadius: 6,
                          padding: '6px 8px',
                          cursor: 'pointer',
                        }}
                      >
                        <Checkbox
                          name="categories"
                          value={key}
                          defaultChecked={checked}
                        />
                        <span>{val.text.pt}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            </div>
          )
        }
      >
        <main className="theme-light py-5">
          <Field
            label="Buscar receita"
            type="search"
            name="text"
            defaultValue={query}
            placeholder="Digite o nome ou palavra-chave"
            className="mb-3"
          />

          <Button type="submit" className="mb-3">
            <CiSearch />
            buscar
          </Button>

          <h1 className="h1 mb-3 mt-4">Resultados para: {query}</h1>

          <SectionCard>
            {query || selected.length > 0 ? (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                    marginBottom: 8,
                  }}
                >
                  {selectedLabels.length > 0 && (
                    <>
                      <span style={{ opacity: 0.7 }}>|</span>
                      <h2 style={{ opacity: 0.7 }}>Categorias:</h2>
                      {selected.map((key) => (
                        <a
                          key={key}
                          href={buildUrl(undefined, key)}
                          style={{ textDecoration: 'none' }}
                          title="Remover filtro"
                        >
                          <span
                            style={{
                              fontSize: 12,
                              padding: '4px 8px',
                              borderRadius: 999,
                              background: '#f2f2f2',
                            }}
                          >
                            {categoriesMap?.[key]?.text?.pt || key} x
                          </span>
                        </a>
                      ))}
                      <a
                        href={buildUrl(20)}
                        style={{ marginLeft: 8, fontSize: 12, opacity: 0.8 }}
                      >
                        Limpar filtros
                      </a>
                    </>
                  )}
                </div>
                {recipes.length === 0 && (
                  <p style={{ opacity: 0.7 }}>Nenhuma receita encontrada.</p>
                )}
                <ul className="row g-3">
                  {recipes.map((recipe) => (
                    <li key={recipe.id} className="col-6">
                      <Link
                        href={`/recipe/${recipe.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Card
                          style={{ height: '100%' }}
                          variant="slim"
                          title={
                            <h2 id={String(recipe.id)}>
                              {capitalize(recipe.name)}
                            </h2>
                          }
                          img={
                            <Image2
                              srcs={[
                                ...(recipe?.imgs ?? []),
                                ...(recipe?.food?.imgs ?? []),
                              ]}
                            />
                          }
                        >
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'space-between',
                              height: '100%',
                            }}
                          >
                            <p
                              style={{
                                maxHeight: 126,
                                textOverflow: 'ellipsis',
                                textAlign: 'justify',
                                overflow: 'hidden',
                              }}
                            >
                              {recipe.description}
                            </p>

                            <p
                              className="mt-2 p-1 text-center"
                              style={{
                                border: '1px solid var(--color-dark-main)',
                                borderRadius: 'var(--border-radius-secondary)',
                              }}
                            >
                              {recipe.author?.displayName}
                            </p>
                          </div>
                        </Card>
                      </Link>
                      {Array.isArray(recipe.categories) &&
                        recipe.categories.length > 0 && (
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: 6,
                              marginTop: 8,
                            }}
                          >
                            {recipe.categories.map((key) => (
                              <span
                                key={key}
                                style={{
                                  fontSize: 11,
                                  padding: '3px 6px',
                                  borderRadius: 999,
                                  background: '#f7f7f7',
                                  border: '1px solid #eee',
                                }}
                              >
                                {categoriesMap?.[key]?.text?.pt || key}
                              </span>
                            ))}
                          </div>
                        )}
                    </li>
                  ))}
                </ul>

                {recipes.length >= quantity && (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: 16,
                    }}
                  >
                    <a
                      href={buildUrl(quantity + 20)}
                      style={{ textDecoration: 'none' }}
                    >
                      <button
                        type="button"
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          border: '1px solid #ccc',
                        }}
                      >
                        Carregar mais
                      </button>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <Categories className="row g-3" categories={categoriesList} />
            )}
          </SectionCard>
        </main>
      </Layout2>
    </form>
  );
}
