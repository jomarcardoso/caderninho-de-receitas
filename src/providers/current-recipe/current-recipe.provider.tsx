import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import useRecipe from '../../hooks/use-current-recipe';
import RecipesContext from '../recipes/recipes.context';
import { RECIPE } from '../../services/recipe';
import { last } from 'lodash';
import CurrentRecipeContext from './current-recipe.context';

export const CurrentRecipeProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const { recipes = [] } = useContext(RecipesContext);
  const { currentRecipe, setCurrentRecipe, restoreLastRecipe } = useRecipe(
    last(recipes) || RECIPE,
  );
  const memoizedCurrentRecipe = useMemo(
    () => ({
      currentRecipe,
      restoreLastRecipe,
      setCurrentRecipe,
    }),
    [currentRecipe, restoreLastRecipe, setCurrentRecipe, setCurrentRecipe],
  );

  return (
    <CurrentRecipeContext.Provider value={memoizedCurrentRecipe}>
      {children}
    </CurrentRecipeContext.Provider>
  );
};
