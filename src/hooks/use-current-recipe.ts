import { useEffect, useState } from 'react';
import { Meal, MealData, MealService, MEAL_DATA } from '../services/meal';

const CURRENT_SAVED_RECIPE = 'currentRecipe';

let initialRecipeData = MEAL_DATA;

if (typeof window !== 'undefined') {
  const savedCurrentMealJson = localStorage.getItem(CURRENT_SAVED_RECIPE);

  if (savedCurrentMealJson) {
    initialRecipeData = JSON.parse(savedCurrentMealJson) as MealData;
  }
}

if (typeof window !== 'undefined') {
  const sharedString = window.location.search;

  if (sharedString) {
    const mealShared = MealService.unFormatToShare(sharedString);

    if (mealShared.portions.length) {
      initialRecipeData = mealShared;

      window.history.replaceState(
        {},
        '',
        `${window.location.origin}#meal-panel`,
      );
    }
  }
}

const useRecipe = (): {
  currentRecipeData: MealData;
  setCurrentRecipeData: React.Dispatch<React.SetStateAction<MealData>>;
  setCurrentRecipe(meal: Meal): void;
} => {
  const [recipeData, setCurrentRecipeData] =
    useState<MealData>(initialRecipeData);

  function setCurrentRecipe(meal: Meal) {
    setCurrentRecipeData(MealService.unFormat(meal));
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
