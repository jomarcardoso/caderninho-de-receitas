import { useState, useEffect, useCallback, useContext } from 'react';
import {
  fetchRecipes,
  removeRecipeById,
  saveRecipe as saveRecipeService,
} from 'services/recipe/recipe.service';
import type { RecipeDto } from 'services/recipe/recipe.dto';
import type { DataContextProps } from './data.context';
import { RECIPES_DATA } from 'services/recipe/recipe.data';
import LoadingContext from '../loading/loading.context';
import { LanguageContext } from '../language/language.context';

export function useData(): DataContextProps {
  const { setLoading } = useContext(LoadingContext);
  const { language } = useContext(LanguageContext);
  const [data, setData] = useState(RECIPES_DATA);

  /**
   * @returns Updated recipes dataset
   */
  async function saveRecipe(recipe: RecipeDto) {
    setLoading?.(true);
    const payload: RecipeDto = { ...recipe, language: recipe.language ?? language };
    const newData = await saveRecipeService(payload, payload.language);

    if (newData.recipes.length) {
      setData(newData);
    }

    setLoading?.(false);

    return newData;
  }

  async function removeRecipe(id = 0) {
    const newData = await removeRecipeById(id);

    if (newData.recipes.length) {
      setData(newData);
    }
  }

  const getData = useCallback(async () => {
    const newData = await fetchRecipes();

    if (newData.recipes) {
      setData(newData);
    }

    setLoading?.(false);
  }, [setData]);

  useEffect(() => {
    getData();
    setLoading?.(true);
  }, []);

  return {
    data: data,
    removeRecipe,
    saveRecipe,
  };
}

