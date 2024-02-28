import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { last } from 'lodash';

import RecipesContext from '../contexts/recipes-context';
import useRecipe from '../hooks/use-current-recipe';
import { RECIPE, RECIPE_DATA, RecipeService } from '../services/recipe';
import DesktopHeader from '../components/desktop-header/desktop-header';
import NotebookTabs from '../components/notebook-tabs/notebook-tabs';
import SEO from '../components/seo';
import CurrentRecipeContext from '../contexts/current-recipe';
import { DesktopFoodsPage } from './foods-page';

export const DesktopApp: FC = () => {
  const { recipes = [] } = useContext(RecipesContext);
  const {
    currentRecipeData,
    setCurrentRecipeData,
    setCurrentRecipe,
    restoreLastRecipe,
  } = useRecipe(RecipeService.unFormat(last(recipes) || RECIPE) || RECIPE_DATA);
  const memoizedCurrentRecipe = useMemo(
    () => ({
      currentRecipeData,
      restoreLastRecipe,
      setCurrentRecipe,
      setCurrentRecipeData,
    }),
    [
      currentRecipeData,
      restoreLastRecipe,
      setCurrentRecipe,
      setCurrentRecipeData,
    ],
  );
  const [currentPage, setCurrentPage] = useState('#main-panel');

  useEffect(() => {
    console.log(setCurrentPage);
  }, []);

  return (
    <CurrentRecipeContext.Provider value={memoizedCurrentRecipe}>
      <div className="desktop-container">
        <div className="page relative" style={{ zIndex: 1 }}>
          <DesktopHeader />

          <DesktopFoodsPage />
        </div>

        <NotebookTabs
          tabs={[
            {
              active: currentPage === '#foods-panel',
              children: 'alimentos',
              link: '#foods-panel',
            },
            {
              active: currentPage === '#main-panel',
              children: 'receitas',
              link: '#main-panel',
            },
            {
              active: currentPage === '#recipe-panel',
              children: 'cozinhar',
              link: '#recipe-panel',
            },
          ]}
        />
      </div>

      <SEO title="Caderninho de Receitas" />
    </CurrentRecipeContext.Provider>
  );
};
