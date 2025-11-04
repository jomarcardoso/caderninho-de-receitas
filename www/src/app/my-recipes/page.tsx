import type { Metadata } from 'next';
import MyRecipesClient from './ui/MyRecipes.client';
import { fetchRecipes as fetchRecipesFull } from '@common/services/recipe';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Footer2 } from '@/components/footer-2/footer-2';
import { Language } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';
import { Button } from 'notebook-layout';
import { fetchRecipes, Recipe } from '@common/services/recipe';
import Link from 'next/link';
import { ListItem } from '@/components/list-item/list-item';
import capitalize from 'lodash/capitalize';

export const metadata: Metadata = {
  title: 'Minhas listas de receitas',
};

export default async function MyRecipesPage() {
  const language: Language = 'pt';
  const data = await fetchRecipesFull();
  const recipes = data.recipes;
  const recipeLists = data.recipeLists ?? [];

  // Transform common lists shape (items with `recipe`) to the UI service shape (items with `recipeId` and optional `recipe`)
  const initialLists = recipeLists.map((l) => ({
    id: l.id,
    ownerId: l.ownerId,
    name: l.name,
    description: l.description ?? null,
    createdAt: l.createdAt,
    updatedAt: l.updatedAt,
    items: (l.items ?? []).map((it) => ({
      recipeListId: it.recipeListId,
      recipeId: (it.recipe as any)?.id as number,
      position: it.position,
      createdAt: it.createdAt,
      recipe: it.recipe
        ? {
            id: (it.recipe as any).id as number,
            name: it.recipe.name,
            description: (it.recipe as any).description ?? null,
            imgs: (it.recipe as any).imgs ?? [],
          }
        : undefined,
    })),
  }));

  function renderItem(recipe: Recipe) {
    return (
      <ListItem
        key={recipe.id}
        isAction
        // isActive={recipe.id === currentRecipeId}
        tabIndex={0}
        href={`/recipe/${recipe.id}`}
      >
        {capitalize(recipe.name)}
      </ListItem>
    );
  }

  return (
    <Layout2
      header={<Header2 currentPage="my-recipes" />}
      footer={
        <Footer2>
          <Link href="/">
            <ion-icon name="arrow-back-outline" />
          </Link>
          <Link href="/kitchen">
            <ion-icon name="add-circle-outline" />
          </Link>
        </Footer2>
      }
    >
      <main className="theme-light container py-5">
        <section
          className="grid"
          ovo-scrollspy-content="1"
          aria-labelledby="my-recipes-title"
          id="recipes"
        >
          <div className="g-col-12">
            <h1 className="section-title" id="my-recipes-title">
              {translate('myRecipesHeading', language)}
            </h1>
          </div>

          <div className="g-col-12">
            <ol className="list">{recipes.map(renderItem)}</ol>
          </div>

          <div className="g-col-12">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                as={Link}
                className="button button--secondary"
                href="/kitchen"
              >
                <ion-icon name="add-circle-outline" />
                {translate('addNewRecipe', language)}
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-5" id="lists">
          <h2 className="h2 mb-3" style={{ marginBottom: 8 }}>
            Minhas listas
          </h2>

          {recipeLists.length === 0 && <p>Nenhuma lista criada.</p>}

          <ul className="list" style={{ maxWidth: 560 }}>
            {recipeLists.map((l) => (
              <li key={l.id}>
                <h3 className="section-title">{l.name}</h3>
                {l.description && (
                  <span style={{ opacity: 0.8 }}>{l.description}</span>
                )}

                {l.items?.length ? (
                  <ol className="list">
                    {l.items.map((it) => renderItem(it.recipe))}
                  </ol>
                ) : null}

                <button
                  // onClick={() => handleDelete(l.id)}
                  style={{
                    padding: 8,
                    borderRadius: 6,
                    border: '1px solid #eee',
                  }}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </section>

        <MyRecipesClient initialLists={initialLists as any} />

        {/* <ShoppingList /> */}
      </main>
    </Layout2>
  );
}
