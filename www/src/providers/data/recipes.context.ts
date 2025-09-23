import { createContext } from 'react';
import { RecipesData } from '../../services/recipe/recipe.model';
import { RecipeDto } from '../../services/recipe/recipe.dto';

export interface DataContextProps {
  data?: RecipesData;
  saveRecipe?(recipe: RecipeDto): void;
  removeRecipe?(id: number): void;
}

export const DataContext = createContext<DataContextProps>({});
