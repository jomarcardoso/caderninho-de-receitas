'use client';
import {
  useState,
  useEffect,
  useCallback,
  useContext,
  HTMLProps,
  FC,
} from 'react';
import {
  fetchRecipes,
  removeRecipeById,
  saveRecipe as saveRecipeService,
} from 'services/recipe/recipe.service';
import type { RecipeDto } from 'services/recipe/recipe.dto';
import { DataContext } from './data.context';
import { RECIPES_DATA } from 'services/recipe/recipe.data';
import LoadingContext from '../loading/loading.context';
import HealthContext from '../health/health.context';
import {
  getCachedRecipesData,
  setCachedRecipesData,
} from '../../services/storage/recipes-cache';
import { LanguageContext } from '@/contexts/language';
import { RecipesData } from '@common/services/recipe';

interface DataProviderProps extends HTMLProps<HTMLDivElement> {
  initialData?: typeof RECIPES_DATA; // dados vindos do SSR opcionalmente
}

export const DataProvider: FC<DataProviderProps> = ({
  children,
  initialData,
}) => {
  const { setLoading } = useContext(LoadingContext);
  const { serverUp, checking } = useContext(HealthContext);
  const { language } = useContext(LanguageContext);
  const [data, setData] = useState(initialData ?? RECIPES_DATA);

  const updateData = useCallback(
    (data: RecipesData) => {
      setData(data);
    },
    [setData],
  );

  // Atualiza receita
  async function saveRecipe(recipe: RecipeDto) {
    setLoading?.(true);
    const payload: RecipeDto = {
      ...recipe,
      language: recipe.language ?? language,
    };
    const newData = await saveRecipeService(payload, payload.language);

    if (newData.recipes.length) {
      setData(newData);
      await setCachedRecipesData(newData);
    }

    setLoading?.(false);
    return newData;
  }

  // Remove receita
  async function removeRecipe(id = 0) {
    const newData = await removeRecipeById(id);
    setData(newData);
    await setCachedRecipesData(newData);
  }

  // Atualiza do backend
  const getData = useCallback(async () => {
    const newData = await fetchRecipes();
    if (newData.recipes?.length) {
      setData(newData);
      await setCachedRecipesData(newData);
    }
    setLoading?.(false);
  }, [setData]);

  // Efeito de inicialização
  useEffect(() => {
    // Se já veio via SSR, não precisa buscar nem cachear de novo
    if (initialData) {
      setCachedRecipesData(initialData);
      setLoading?.(false);
      return;
    }

    // Em rotas de detalhe/edição, não buscamos a listagem global
    try {
      const path = typeof window !== 'undefined' ? window.location.pathname : '';
      if (/^\/(recipe|kitchen)\/\d+(?:$|\/)/.test(path)) {
        setLoading?.(false);
        return;
      }
    } catch {}

    // Caso contrário, segue o fluxo normal de cache + fetch
    (async () => {
      const cached = await getCachedRecipesData();

      if (cached) {
        setData(cached);
        setLoading?.(false);
        if (!checking && serverUp) getData();
      } else if (!checking && serverUp) {
        setLoading?.(true);
        await getData();
      } else {
        setLoading?.(false);
      }
    })();
  }, [serverUp, checking, initialData, getData]);

  return (
    <DataContext.Provider
      value={{ data, removeRecipe, saveRecipe, setData: updateData }}
    >
      {children}
    </DataContext.Provider>
  );
};

