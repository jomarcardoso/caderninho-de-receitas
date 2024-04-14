import React, { createContext } from 'react';
import { Recipe, RECIPE } from '../../services/recipe';

const CurrentRecipeContext = createContext<{
  currentRecipe: Recipe;
  setCurrentRecipe?: React.Dispatch<React.SetStateAction<Recipe>>;
  restoreLastRecipe?: () => void;
}>({ currentRecipe: RECIPE });

export default CurrentRecipeContext;
