import React, { FC, HTMLProps, useMemo } from 'react';
import useRecipes from '../../hooks/use-recipes';
import useFoods from '../../hooks/use-food';
import RecipesContext from '../../contexts/recipes-context';
import FoodsContext from '../../contexts/foods-context';

const Contexts: FC<HTMLProps<HTMLDivElement>> = ({ children }) => {
  const foods = useFoods();
  const { addRecipe, recipes, removeRecipe } = useRecipes(foods);
  const memoizedFoods = useMemo(() => foods, [foods]);
  const memoizedRecipes = useMemo(
    () => ({ addRecipe, recipes, removeRecipe }),
    [addRecipe, recipes, removeRecipe],
  );

  return (
    <FoodsContext.Provider value={memoizedFoods}>
      <RecipesContext.Provider value={memoizedRecipes}>
        {children}
      </RecipesContext.Provider>
    </FoodsContext.Provider>
  );
};

export default Contexts;
