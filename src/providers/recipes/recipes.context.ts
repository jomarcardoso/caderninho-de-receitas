import { createContext } from 'react';
import { Recipe } from '../../services/recipe';

export const RecipesContext = createContext<{
  recipes: Array<Recipe>;
  addRecipe?(recipe: Recipe): number;
  removeRecipe?(id: number): void;
}>({ recipes: [] });
