import { useEffect, useState } from 'react';
import {
  Recipe,
  RecipeData,
  RecipeService,
  RECIPE_DATA,
} from '../services/recipe';

const CURRENT_SAVED_RECIPE = 'currentRecipe';

let initialRecipeData = RECIPE_DATA;

if (typeof window !== 'undefined') {
  const savedCurrentRecipeJson = localStorage.getItem(CURRENT_SAVED_RECIPE);

  if (savedCurrentRecipeJson) {
    initialRecipeData = JSON.parse(savedCurrentRecipeJson) as RecipeData;
  }
}

if (typeof window !== 'undefined') {
  const sharedString = window.location.search;

  if (sharedString) {
    const recipeShared = RecipeService.unFormatToShare(sharedString);

    if (recipeShared.portions.length) {
      initialRecipeData = recipeShared;

      window.history.replaceState(
        {},
        '',
        `${window.location.origin}#recipe-panel`,
      );
    }
  }
}

const useRecipe = (): {
  currentRecipeData: RecipeData;
  setCurrentRecipeData: React.Dispatch<React.SetStateAction<RecipeData>>;
  setCurrentRecipe(recipe: Recipe): void;
} => {
  const [recipeData, setCurrentRecipeData] =
    useState<RecipeData>(initialRecipeData);

  function setCurrentRecipe(recipe: Recipe) {
    setCurrentRecipeData(RecipeService.unFormat(recipe));
  }

  useEffect(() => {
    localStorage.setItem(CURRENT_SAVED_RECIPE, JSON.stringify(recipeData));
  }, [recipeData]);

  return {
    currentRecipeData: recipeData,
    setCurrentRecipeData,
    setCurrentRecipe,
  };
};

export default useRecipe;
