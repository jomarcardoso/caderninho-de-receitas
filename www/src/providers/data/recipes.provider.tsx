import React, { FC, HTMLProps, useContext, useMemo } from 'react';
import { DataContext } from './recipes.context';
import { useData } from './recipes.hook';

export const RecipesProvider: FC<HTMLProps<HTMLDivElement>> = ({
  children,
}) => {
  const { saveRecipe: addRecipe, recipes, removeRecipe } = useData();

  return (
    <DataContext.Provider
      value={{ saveRecipe: addRecipe, data: recipes, removeRecipe }}
    >
      {children}
    </DataContext.Provider>
  );
};
