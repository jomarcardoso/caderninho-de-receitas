import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import CurrentRecipeContext from './current-recipe.context';
import { useRecipe } from './current-recipe.hook';

export const CurrentRecipeProvider: FC<HTMLProps<Element>> = ({ children }) => {
  const { currentRecipe, setCurrentRecipe, restoreLastRecipe } = useRecipe();
  const memoizedCurrentRecipe = useMemo(
    () => ({
      currentRecipe,
      restoreLastRecipe,
      setCurrentRecipe,
    }),
    [currentRecipe, restoreLastRecipe, setCurrentRecipe],
  );

  return (
    <CurrentRecipeContext.Provider value={memoizedCurrentRecipe}>
      {children}
    </CurrentRecipeContext.Provider>
  );
};
