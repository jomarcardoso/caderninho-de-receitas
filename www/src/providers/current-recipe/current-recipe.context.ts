import React, { createContext } from 'react';
import { Recipe } from '../../services/recipe/recipe.model';

const CurrentRecipeContext = createContext<{
  currentRecipe?: Recipe;
  setCurrentRecipe?: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  restoreLastRecipe?: () => void;
}>({});

export default CurrentRecipeContext;
