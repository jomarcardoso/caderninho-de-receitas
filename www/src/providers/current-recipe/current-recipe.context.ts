import React, { createContext } from 'react';
import { RecipeDto } from '../../services/recipe/recipe.dto';

export interface CurrentRecipeContextProps {
  currentRecipe?: RecipeDto;
  setCurrentRecipe?: React.Dispatch<
    React.SetStateAction<RecipeDto | undefined>
  >;
  restoreLastRecipe?: () => void;
}

const CurrentRecipeContext = createContext<CurrentRecipeContextProps>({});

export default CurrentRecipeContext;
