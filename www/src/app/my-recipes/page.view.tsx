'use client';
import { CiCircleChevLeft, CiCirclePlus } from 'react-icons/ci';
import './page.scss';
// import MyRecipesClient from './ui/MyRecipes.client';
import { Layout2 } from '@/components/layout-2/layout-2';
import { Header2 } from '@/components/header-2/header-2';
import { Navbar } from '@/components/navbar/navbar';
import { Language } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';
import { Button, Card } from 'notebook-layout';
import Link from 'next/link';
import { NavLink } from '@/components/nav-link/nav-link';
import { ListItem } from '@/components/list-item/list-item';
import capitalize from 'lodash/capitalize';
import { Recipe, RecipesData } from '@common/services/recipe';
import { FC } from 'react';
import { Image2 } from '@/components/image-2/image';

export interface MyRecipesViewProps {
  data: RecipesData;
}

export const MyRecipesView: FC<MyRecipesViewProps> = ({ data }) => {
  const language: Language = 'pt';
  const { recipes, recipeLists } = data;

  function renderItem(recipe: Recipe) {
    return (
      <li className="col-12" key={recipe.id}>
        <Link href={`/recipe/${recipe.id}`}>
          <article aria-labelledby={String(recipe.id)}>
            <Card
              title={<h2 id={String(recipe.id)}>{capitalize(recipe.name)}</h2>}
              img={
                <Image2
                  srcs={[
                    ...(recipe?.imgs ?? []),
                    ...(recipe?.food?.imgs ?? []),
                  ]}
                />
              }
            >
              <ul className="row no-gutters g-3">
                <li className="col-6">
                  <strong>{translate('foodFormCalories', language)}</strong>
                  <br />
                  {recipe.nutritionalInformation[2].quantity.toFixed(0)}
                </li>
                <li className="col-6">
                  <strong>{translate('foodFormProteins', language)}</strong>
                  <br />
                  {recipe.nutritionalInformation[10].quantity.toFixed(0)}
                </li>
                <li className="col-6">
                  <strong>{translate('foodFormFat', language)}</strong>
                  <br />
                  {recipe.nutritionalInformation[13].quantity.toFixed(0)}
                </li>
                <li className="col-6">
                  <strong>{translate('foodFormDietaryFiber', language)}</strong>
                  <br />
                  {recipe.nutritionalInformation[5].quantity.toFixed(0)}
                </li>
              </ul>
            </Card>
          </article>
        </Link>
      </li>
    );
    // return (
    //   <ListItem
    //     key={recipe.id}
    //     isAction
    //     // isActive={recipe.id === currentRecipeId}
    //     tabIndex={0}
    //     href={`/recipe/${recipe.id}`}
    //   >
    //     {capitalize(recipe.name)}
    //   </ListItem>
    // );
  }

  return (
    <Layout2
      className="my-recipes-page"
      header={<Header2 currentPage="my-recipes" />}
      navbar={
        <Navbar>
          <NavLink action="pop">
            <CiCircleChevLeft className="svg-icon" />
            página <br /> anterior
          </NavLink>
          <Link href="/kitchen">
            <CiCirclePlus className="svg-icon" />
            nova <br /> receita
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
            <h1 className="h1" id="my-recipes-title">
              {translate('myRecipesHeading', language)}
            </h1>
          </div>

          <div className="g-col-12">
            <ol className="row no-gutters g-4">{recipes.map(renderItem)}</ol>
          </div>

          <div className="g-col-12">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button as={Link} href="/kitchen">
                <CiCirclePlus />
                {translate('addNewRecipe', language)}
              </Button>
            </div>
          </div>
        </section>

        <section className="mt-5" id="lists">
          <h2 className="h2 mb-3" style={{ marginBottom: 8 }}>
            Minhas listas
          </h2>

          {(recipeLists?.length ?? 0) === 0 && <p>Nenhuma lista criada.</p>}

          <ul className="list" style={{ maxWidth: 560 }}>
            {(recipeLists ?? []).map((l) => (
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

        <div className="d-flex justify-content-center mt-4">
          <NavLink action="pop" className="button button--secondary">
            <CiCircleChevLeft />
            voltar para página anterior
          </NavLink>
        </div>
      </main>
    </Layout2>
  );
};
