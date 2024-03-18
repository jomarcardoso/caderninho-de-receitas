import { useEffect, useState } from 'react';
import {
  Recipe,
  RecipeData,
  RecipeService,
  RECIPE_DATA,
} from '../services/recipe';
import { StorageService } from '../storage';
import { STORAGE_CURRENT_RECIPE } from '../storage/storage.service';

let initialRecipeData = RECIPE_DATA;

if (typeof window !== 'undefined') {
  const editingRecipeJson = localStorage.getItem(STORAGE_CURRENT_RECIPE);

  if (editingRecipeJson) {
    initialRecipeData = JSON.parse(editingRecipeJson) as RecipeData;
  }
}

if (typeof window !== 'undefined') {
  const sharedString = window.location.search;

  if (sharedString) {
    const recipeShared = RecipeService.generateRecipeDataByParams(sharedString);

    if (recipeShared.steps[0]?.ingredients?.length) {
      initialRecipeData = recipeShared;

      StorageService.setCurrentRecipe(recipeShared);
      window.location.search = '';
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

  function setCurrentRecipe(recipe: RecipeData) {
    if (recipeData.id) {
      setLastRecipeData(recipeData);
    }

    setRecipeData(recipe);
  }

  function restoreLastRecipe() {
    setRecipeData(lastRecipeData);
  }

  useEffect(() => {
    StorageService.setCurrentRecipe(recipeData);
  }, [recipeData]);

  return {
    currentRecipeData: recipeData,
    setCurrentRecipeData,
    setCurrentRecipe,
    restoreLastRecipe,
  };
};

export default useRecipe;
