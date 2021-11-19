import React, { createContext } from 'react';
import { Recipe, RecipeData, RECIPE_DATA } from '../services/recipe';

const CurrentRecipeContext = createContext<{
  currentRecipeData: RecipeData;
  setCurrentRecipeData?: React.Dispatch<React.SetStateAction<RecipeData>>;
  setCurrentRecipe?: React.Dispatch<React.SetStateAction<Recipe>>;
}>({ currentRecipeData: RECIPE_DATA });

export default CurrentRecipeContext;
