import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import { RecipesContext } from './recipes.context';
import { FirebaseContext } from '../firebase';
import { useRecipes } from './recipes.hook';

export const RecipesProvider: FC<HTMLProps<HTMLDivElement>> = ({
  children,
}) => {
  const firebase = useContext(FirebaseContext);
  const { addRecipe, recipes, removeRecipe } = useRecipes(firebase);

  return (
    <RecipesContext.Provider value={{ addRecipe, recipes, removeRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
};
