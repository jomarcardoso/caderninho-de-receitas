'use client';
import './page.scss';
// import MyRecipesClient from './ui/MyRecipes.client';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import { Language } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';
import { Button } from 'notebook-layout';
import Link from 'next/link';
import { ListItem } from '@/components/list-item/list-item';
import capitalize from 'lodash/capitalize';
import { Recipe, RecipesData } from '@common/services/recipe';
import { FC } from 'react';

export interface MyRecipesViewProps {
  data: RecipesData;
}

export const MyRecipesView: FC<MyRecipesViewProps> = ({ data }) => {
  const language: Language = 'pt';
  const { recipes, recipeLists } = data;

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
      className="my-recipes-page"
      header={<Header2 currentPage="my-recipes" />}
      navbar={
        <Navbar>
          <Link href="/">
            <ion-icon name="arrow-back-outline" />
          </Link>
          <Link href="/kitchen">
            <ion-icon name="add-circle-outline" />
          </Link>
          <Link href="/user">
            <ion-icon name="person-circle-outline" />
          </Link>
        </Navbar>
      }
    >
      <main className="py-5">
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

                <Button className="mt-3" variant="secondary" type="button">
                  Excluir
                </Button>
              </li>
            ))}
          </ul>
        </section>

        {/* <MyRecipesClient initialLists={recipeLists} /> */}

        {/* <ShoppingList /> */}
      </main>
    </Layout2>
  );
};
