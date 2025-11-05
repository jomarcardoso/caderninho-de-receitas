'use client';
import { type RecipeDto } from '@common/services/recipe';
import { createContext } from 'react';

export interface CurrentRecipeContextProps {
  currentRecipeDto?: RecipeDto;
  currentRecipeId?: number;
  setCurrentRecipeId?: React.Dispatch<number>;
  restoreLastRecipe?: () => void;
}

const CurrentRecipeContext = createContext<CurrentRecipeContextProps>({});

export default CurrentRecipeContext;
