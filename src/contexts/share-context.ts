import { createContext } from 'react';
import { RecipeData } from '../services/recipe';

export type ShareFunction = (recipe: RecipeData) => void;

/**
 * The param can be the id of the recipe or the full recipe.
 */
export const ShareContext = createContext<ShareFunction>(() => {});
