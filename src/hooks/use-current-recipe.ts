import { useEffect, useState } from 'react';
import { Meal, MealData, MealService, MEAL_DATA } from '../services/meal';

const CURRENT_RECIPE_ID = 'currentRecipe';

const savedCurrentMealJson = localStorage.getItem(CURRENT_RECIPE_ID);
let initialRecipeData = MEAL_DATA;

if (savedCurrentMealJson) {
  initialRecipeData = JSON.parse(savedCurrentMealJson) as MealData;
}

const sharedString = window.location.search;

if (sharedString) {
  const mealShared = MealService.unFormatToShare(sharedString);

  if (mealShared.portions.length) {
    initialRecipeData = mealShared;

    window.history.replaceState({}, '', `${window.location.origin}#meal-panel`);
  }
}

const useRecipe = () => {
  const [recipeData, setCurrentRecipeData] =
    useState<MealData>(initialRecipeData);

  function setCurrentRecipe(meal: Meal) {
    setCurrentRecipeData(MealService.unFormat(meal));
  }

  useEffect(() => {
    localStorage.setItem(CURRENT_RECIPE_ID, JSON.stringify(recipeData));
  }, [recipeData]);

  return {
    currentRecipeData: recipeData,
    setCurrentRecipeData,
    setCurrentRecipe,
  };
};

export default useRecipe;
