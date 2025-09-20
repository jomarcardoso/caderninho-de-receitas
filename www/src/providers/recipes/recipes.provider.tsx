import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import { RecipesContext } from './recipes.context';
import { useRecipes } from './recipes.hook';

export const RecipesProvider: FC<HTMLProps<HTMLDivElement>> = ({
  children,
}) => {
  const { addRecipe, recipes, removeRecipe } = useRecipes();

  return (
    <RecipesContext.Provider value={{ addRecipe, recipes, removeRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
};
