import { Footer2 } from '@/components/footer-2/footer-2';
import { Header2 } from '@/components/header-2/header-2';
import { Layout2 } from '@/components/layout-2/layout-2';
import Link from 'next/link';
import { Button, Field } from 'notebook-layout';

export const metadata = { title: 'Recipes Search' };

async function fetchCategories() {
  try {
    const base =
      process.env.RECIPES_API_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'http://localhost:5106';
    const res = await fetch(`${base}/api/recipe/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok)
      return {} as Record<
        string,
        {
          text: { en: string; pt: string };
          pluralText: { en: string; pt: string };
        }
      >;
    return (await res.json()) as Record<
      string,
      {
        text: { en: string; pt: string };
        pluralText: { en: string; pt: string };
      }
    >;
  } catch {
    return {} as Record<
      string,
      {
        text: { en: string; pt: string };
        pluralText: { en: string; pt: string };
      }
    >;
  }
}

type RecipeSearchItem = {
  id: number;
  name: string;
  description?: string;
  categories?: string[];
};

async function searchRecipes(
  text?: string,
  categories?: string[],
  quantity = 20,
) {
  if (!text || !text.trim()) return [] as RecipeSearchItem[];
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
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data?.recipes) ? data.recipes : [];
    return list as RecipeSearchItem[];
  } catch {
    return [] as RecipeSearchItem[];
  }
}

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: {
    text?: string;
    categories?: string | string[];
    quantity?: string;
  };
}) {
  const q = searchParams?.text || '';
  const selected = Array.isArray(searchParams?.categories)
    ? (searchParams?.categories as string[])
    : typeof searchParams?.categories === 'string'
    ? [searchParams?.categories as string]
    : [];
  const quantity = Math.max(
    1,
    Math.min(
      200,
      Number.parseInt(String(searchParams?.quantity ?? '20')) || 20,
    ),
  );
  const [categoriesMap, recipes] = await Promise.all([
    fetchCategories(),
    searchRecipes(q, selected, quantity),
  ]);
  const categoryEntries = Object.entries(categoriesMap);
  const selectedLabels = selected.map((k) => categoriesMap?.[k]?.text?.pt || k);

  function buildUrl(nextQuantity?: number, omitCategory?: string) {
    const params = new URLSearchParams();
    if (q) params.set('text', q);
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
    <Layout2
      header={<Header2 />}
      footer={
        <Footer2>
          <Link href="/">
            <ion-icon name="arrow-back-outline" />
          </Link>
        </Footer2>
      }
    >
      <main className="theme-light">
        <div className="container py-5">
          <h1 className="h1 mb-5">Buscar receitas</h1>
          <form method="get" action="/search" className="mb-5">
            <Field
              label="Buscar receita"
              type="search"
              name="text"
              defaultValue={q}
              placeholder="Digite o nome ou palavra-chave"
              className="mb-3"
            />
            <Button type="submit" className="mb-3">
              <ion-icon name="search-outline" />
              buscar
            </Button>

            {categoryEntries.length > 0 && (
              <fieldset
                style={{
                  border: '1px solid #eee',
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <legend style={{ padding: '0 6px', opacity: 0.8 }}>
                  Categorias
                </legend>
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
                        }}
                      >
                        <input
                          type="checkbox"
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
            )}
          </form>

          {(q || selected.length > 0) && (
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
                <p style={{ opacity: 0.7, marginBottom: 0 }}>
                  Resultados para: <strong>{q || '—'}</strong>
                </p>
                {selectedLabels.length > 0 && (
                  <>
                    <span style={{ opacity: 0.7 }}>|</span>
                    <span style={{ opacity: 0.7 }}>Categorias:</span>
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
                          {categoriesMap?.[key]?.text?.pt || key} ×
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
              <ul
                style={{
                  display: 'grid',
                  gap: 12,
                  listStyle: 'none',
                  padding: 0,
                }}
              >
                {recipes.map((r) => (
                  <li
                    key={r.id}
                    style={{
                      border: '1px solid #eee',
                      borderRadius: 8,
                      padding: 12,
                    }}
                  >
                    <Link
                      href={`/recipe/${r.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div style={{ fontWeight: 600 }}>{r.name}</div>
                      {r.description && (
                        <div
                          style={{ fontSize: 14, opacity: 0.8, marginTop: 4 }}
                        >
                          {r.description}
                        </div>
                      )}
                    </Link>
                    {Array.isArray(r.categories) && r.categories.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 6,
                          marginTop: 8,
                        }}
                      >
                        {r.categories.map((key) => (
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
          )}
        </div>
      </main>
    </Layout2>
  );
}
