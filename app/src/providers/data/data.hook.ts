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
import HealthContext from '../health/health.context';
import { LanguageContext } from '../language/language.context';
import { getCachedRecipesData, setCachedRecipesData } from '../../storage/recipes-cache';

export function useData(): DataContextProps {
  const { setLoading } = useContext(LoadingContext);
  const { serverUp, checking } = useContext(HealthContext);
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
      await setCachedRecipesData(newData);
    }

    setLoading?.(false);

    return newData;
  }

  async function removeRecipe(id = 0) {
    const newData = await removeRecipeById(id);

    if (newData.recipes.length) {
      setData(newData);
      await setCachedRecipesData(newData);
    }
  }

  const getData = useCallback(async () => {
    const newData = await fetchRecipes();

    if (newData.recipes && newData.recipes.length) {
      setData(newData);
      await setCachedRecipesData(newData);
    }

    setLoading?.(false);
  }, [setData]);

  useEffect(() => {
    // Primeiro tenta usar o cache para renderização imediata
    (async () => {
      const cached = await getCachedRecipesData();
      
      if (cached) {
        // Tem cache: usa imediatamente (mesmo que recipes esteja vazio, ainda há foods/medidas úteis)
        setData(cached);
        setLoading?.(false);
        // Atualiza silenciosamente se o servidor estiver disponível
        if (!checking && serverUp) {
          getData();
        }
      } else if (!checking && serverUp) {
        // Sem cache, mas online: mostra overlay enquanto busca a primeira vez
        setLoading?.(true);
        await getData();
      } else {
        // Sem cache e offline: não há o que buscar, então não bloqueia a UI
        setLoading?.(false);
      }
    })();
  }, [serverUp, checking]);

  // Quando o servidor voltar, atualiza a partir da API
  useEffect(() => {
    if (!checking && serverUp) {
      getData();
    }
  }, [serverUp, checking]);

  return {
    data: data,
    removeRecipe,
    saveRecipe,
  };
}

