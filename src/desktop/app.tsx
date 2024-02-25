import React, { FC, useContext, useMemo } from 'react';
import { last } from 'lodash';

import RecipesContext from '../contexts/recipes-context';
import useRecipe from '../hooks/use-current-recipe';
import { RECIPE, RECIPE_DATA, RecipeService } from '../services/recipe';
import DesktopHeader from '../components/desktop-header/desktop-header';
import NotebookTabs from '../components/notebook-tabs/notebook-tabs';
import SEO from '../components/seo';
import CurrentRecipeContext from '../contexts/current-recipe';
import LoadingContext from '../contexts/loading';
import PageLoader from '../components/page-loader/page-loader';
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

  return (
    <CurrentRecipeContext.Provider value={memoizedCurrentRecipe}>
      <div className="container-desktop desktop-content">
        <div className="page relative" style={{ zIndex: 1 }}>
          <DesktopHeader />

          <DesktopFoodsPage />
        </div>

        <NotebookTabs
          tabs={[
            {
              children: 'alimentos',
              link: '#foods-panel',
            },
            {
              active: true,
              children: 'receitas',
              link: '#main-panel',
            },
            {
              children: 'cozinhar',
              link: '#recipe-panel',
            },
          ]}
        />
      </div>

      <SEO title="Caderninho de Receitas" />

      <LoadingContext.Consumer>
        {({ loading = false }) => <PageLoader open={loading} />}
      </LoadingContext.Consumer>
    </CurrentRecipeContext.Provider>
  );
};
