import { createContext } from 'react';
import type { Recipe } from 'services/recipe/recipe.model';

export interface CurrentRecipeContextProps {
  currentRecipe?: Recipe;
  setCurrentRecipe?: React.Dispatch<React.SetStateAction<Recipe | undefined>>;
  restoreLastRecipe?: () => void;
}

const CurrentRecipeContext = createContext<CurrentRecipeContextProps>({});

export default CurrentRecipeContext;

