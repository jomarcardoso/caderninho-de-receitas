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
    const recipeShared = RecipeService.generateRecipeDataByParams(sharedString);

    console.log('generateRecipeDataByParams', recipeShared);

    if (recipeShared.steps[0]?.ingredients?.length) {
      initialRecipeData = recipeShared;

      // setTimeout(() => {
      //   window.history.replaceState({}, '', '/#recipe-panel');
      // }, 4000);
    }
  }
}

const useRecipe = (
  lastRegisteredRecipeData: RecipeData,
): {
  currentRecipeData: RecipeData;
  setCurrentRecipeData: React.Dispatch<React.SetStateAction<RecipeData>>;
  setCurrentRecipe(recipe: Recipe): void;
  restoreLastRecipe(): void;
} => {
  if (!initialRecipeData.name) {
    initialRecipeData = lastRegisteredRecipeData;
  }

  const [recipeData, setRecipeData] = useState<RecipeData>(initialRecipeData);
  const [lastRecipeData, setLastRecipeData] =
    useState<RecipeData>(initialRecipeData);

  function setCurrentRecipeData(data: RecipeData) {
    if (recipeData.id) {
      setLastRecipeData(recipeData);
    }

    setRecipeData(data);
  }

  function setCurrentRecipe(recipe: Recipe) {
    if (recipeData.id) {
      setLastRecipeData(recipeData);
    }

    setRecipeData(RecipeService.unFormat(recipe));
  }

  function restoreLastRecipe() {
    setRecipeData(lastRecipeData);
  }

  useEffect(() => {
    localStorage.setItem(CURRENT_SAVED_RECIPE, JSON.stringify(recipeData));
  }, [recipeData]);

  return {
    currentRecipeData: recipeData,
    setCurrentRecipeData,
    setCurrentRecipe,
    restoreLastRecipe,
  };
};

export default useRecipe;
