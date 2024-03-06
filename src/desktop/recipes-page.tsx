import React, { FC, useContext, useState } from 'react';
import SectionTitle from '../components/section-title/section-title';
import { Button } from '../components/button';
import { IoAddCircleOutline } from 'react-icons/io5';
import RecipesContext from '../contexts/recipes-context';
import { Recipe } from '../services/recipe';
import { ListItem } from '../components/list-item/list-item';
import { capitalize } from 'lodash';

export const DesktopRecipesPage: FC = () => {
  const { recipes: savedRecipes = [] } = useContext(RecipesContext);
  const alphabeticalRecipes = savedRecipes.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }

    return 0;
  });

  function renderItem(recipe: Recipe) {
    return (
      // eslint-disable-next-line
      <ListItem
        key={recipe.id}
        // eslint-disable-next-line
        isAction
        // isActive={recipe.id === currentRecipeData.id}
        // onClick={() => handleClickLink(recipe)}
        tabIndex={0}
      >
        {capitalize(recipe.name)}
      </ListItem>
    );
  }

  return (
    <div className="container" style={{ paddingTop: 40 }}>
      <div className="grid g-4">
        <div className="g-col-12 g-col-md-5">oi</div>

        <div className="g-col-12 g-col-md-7">
          <div className="grid">
            <div className="g-col-12">
              <SectionTitle>Minhas receitas</SectionTitle>
            </div>

            <div className="g-col-12">
              <ol className="list">{alphabeticalRecipes.map(renderItem)}</ol>
            </div>

            <div className="g-col-12">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant="secondary"
                  contrast="light"
                  // onClick={() => setCurrentRecipe(RECIPE)}
                >
                  <IoAddCircleOutline />
                  adicionar nova receita
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
