import { createContext } from 'react';
import type { RecipesData } from '../../services/recipe/recipe.model';
import type { RecipeDto } from '../../services/recipe/recipe.dto';
import { RECIPES_DATA } from '../../services/recipe/recipe.data';

export interface DataContextProps {
  data: RecipesData;
  saveRecipe?(recipe: RecipeDto): Promise<RecipesData>;
  removeRecipe?(id: number): void;
}

export const DataContext = createContext<DataContextProps>({
  data: RECIPES_DATA,
});
