import { createContext } from 'react';
import { Recipe, RecipeData } from '../services/recipe';

const RecipesContext = createContext<{
  recipes: Array<Recipe>;
  addRecipe?(recipeData: RecipeData): number;
  removeRecipe?(id: number): void;
}>({ recipes: [] });

export default RecipesContext;
