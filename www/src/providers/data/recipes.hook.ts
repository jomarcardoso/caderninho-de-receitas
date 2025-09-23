import { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import {
  fetchRecipes,
  removeRecipeById,
  saveRecipe as saveRecipeService,
} from '../../services/recipe/recipe.service';
import { RecipeDto } from '../../services/recipe/recipe.dto';
import { DataContextProps } from './recipes.context';
import { RECIPES_DATA } from '../../services/recipe/recipe.data';
import LoadingContext from '../loading/loading.context';

export function useData(): DataContextProps {
  const { setLoading } = useContext(LoadingContext);
  const [data, setData] = useState(RECIPES_DATA);
  const memoizedData = useMemo(() => ({ data, setData }), [data]);

  /**
   * @returns id
   */
  async function saveRecipe(recipe: RecipeDto) {
    const newData = await saveRecipeService(recipe);

    if (newData.recipes.length) {
      setData(newData);
    }
  }

  async function removeRecipe(id = 0) {
    const newData = await removeRecipeById(id);

    if (newData.recipes.length) {
      setData(newData);
    }
  }

  const getData = useCallback(async () => {
    const newData = await fetchRecipes();

    if (newData.recipes.length) {
      setData(newData);
    }

    setLoading?.(false);
  }, [setData]);

  useEffect(() => {
    getData();
    setLoading?.(true);
  }, []);

  return {
    data: memoizedData.data,
    removeRecipe,
    saveRecipe,
  };
}
