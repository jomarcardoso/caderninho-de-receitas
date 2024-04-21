import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import RecipesContext from './recipes.context';
import { FirebaseContext } from '../firebase';
import { useRecipes } from './recipes.hook';
import { FoodsContext } from '../foods';

export const RecipesProvider: FC<HTMLProps<HTMLDivElement>> = ({
  children,
}) => {
  const firebase = useContext(FirebaseContext);
  const foods = useContext(FoodsContext);
  const { addRecipe, recipes, removeRecipe } = useRecipes(firebase);

  const memoizedRecipes = useMemo(
    () => ({ addRecipe, recipes, removeRecipe }),
    [addRecipe, recipes, removeRecipe],
  );

  return (
    <RecipesContext.Provider value={memoizedRecipes}>
      {children}
    </RecipesContext.Provider>
  );
};
