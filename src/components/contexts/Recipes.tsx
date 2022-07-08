import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import useRecipes from '../../hooks/use-recipes';
import RecipesContext from '../../contexts/recipes-context';
import FirebaseContext from '../../contexts/firebase-context';
import FoodsContext from '../../contexts/foods-context';

export const Recipes: FC<HTMLProps<HTMLDivElement>> = ({ children }) => {
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
