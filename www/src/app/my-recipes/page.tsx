import type { Metadata } from 'next';
import MyRecipesClient from './ui/MyRecipes.client';
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
  const { recipes } = await fetchRecipes();

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

  // <MyRecipesClient />
  return (
    <Layout2
      header={<Header2 currentPage="my-recipes" />}
      footer={
        <Footer2>
          <Link href="/kitchen">
            <ion-icon name="add-circle-outline" />
          </Link>
        </Footer2>
      }
    >
      <main className="theme-light container py-5">
        <div className="grid" ovo-scrollspy-content="1" id="minhas-receitas">
          <div className="g-col-12">
            <h1 className="section-title">
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
        </div>

        {/* <ShoppingList /> */}
      </main>
    </Layout2>
  );
}
