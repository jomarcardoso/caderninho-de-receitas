import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import useRecipes from '../../hooks/use-recipes';
import RecipesContext from './recipes.context';
import FoodsContext from '../foods/foods.context';
import { FirebaseContext } from '../firebase';

export const RecipesProvider: FC<HTMLProps<HTMLDivElement>> = ({
  children,
}) => {
  const firebase = useContext(FirebaseContext);
  const foods = useContext(FoodsContext);
  const { addRecipe, recipes, removeRecipe } = useRecipes(foods, firebase);

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
