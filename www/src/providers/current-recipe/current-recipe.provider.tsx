'use client';
import { type FC, type HTMLProps, useMemo } from 'react';
import CurrentRecipeContext from './current-recipe.context';
import { useRecipe } from './current-recipe.hook';

export const CurrentRecipeProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const { currentRecipeId, setCurrentRecipeId, restoreLastRecipe } =
    useRecipe();
  const memoizedCurrentRecipe = useMemo(
    () => ({
      currentRecipeId,
      restoreLastRecipe,
      setCurrentRecipeId,
    }),
    [currentRecipeId, restoreLastRecipe, setCurrentRecipeId],
  );

  return (
    <CurrentRecipeContext.Provider value={memoizedCurrentRecipe}>
      {children}
    </CurrentRecipeContext.Provider>
  );
};
