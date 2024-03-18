import { createContext } from 'react';
import { RecipeData } from '../services/recipe';

const RecipesContext = createContext<{
  recipes: Array<RecipeData>;
  addRecipe?(recipeData: RecipeData): number;
  removeRecipe?(id: number): void;
}>({ recipes: [] });

export default RecipesContext;
