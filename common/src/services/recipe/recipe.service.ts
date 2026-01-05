import type { RecipeResponse, RecipeSummaryResponse } from './recipe.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import axios from 'axios';
import { RecipeSummary, type Recipe } from './recipe.model';
import type { RecipeDto } from './recipe.dto';
import { translate } from '../language/language.service';
import { type Language } from '../language/language.types';
import {
  mapFoodResponseToModel,
  mapFoodsDataResponseToModel,
} from '../food/food.service';
import { type RecipeStepDto } from '../recipe-step';
import { mapIngredientResponseToModel } from '../ingredient/ingredient.service';
import type { AllNutrients, Nutrient } from '../nutrient/nutrient.model';
import type {
  AllNutrientsResponse,
  NutrientsResponse,
} from '../nutrient/nutrient.response';
import { FOOD } from '../food/food.model';
import { mapRecipeStepModelToDto } from '../recipe-step/recipe-step.service';
import { getApiBases } from '../http/api-base';
import {
  httpRequest,
  type AuthenticatedRequestConfig,
} from '../http/http-client';

async function requestWithFallback<T = any>(
  path: string,
  config?: AuthenticatedRequestConfig<T>,
): Promise<T> {
  const bases = getApiBases();
  let lastErr: unknown;
  for (const base of bases) {
    try {
      const response = await httpRequest<T>({
        ...config,
        url: `${base}${path}`,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw error;
      }
      lastErr = error;
    }
  }
  throw lastErr instanceof Error
    ? lastErr
    : new Error('Failed to contact the recipe API');
}

// OwnerId resolve is centralized in ../auth/owner.util

interface ApiRecipeResponse {
  id?: number;
  name?: string;
  description?: string;
  additional?: string;
  language?: string;
  steps?: RecipeStepDto[];
}

function stepToText(step: RecipeStepDto, language: Language): string {
  const suffix = step.title ? ` ${step.title}` : '';
  const ingredientsHeading = translate(
    'recipeStepIngredientsHeading',
    language,
    { suffix },
  );
  const preparationHeading = translate(
    'recipeStepPreparationHeading',
    language,
    { suffix },
  );

  return `\
${ingredientsHeading}

${step.ingredientsText}

${preparationHeading}

${step.title}`;
}

export function recipeDtoToText(
  recipe: RecipeDto,
  language: Language = 'pt',
): string {
  const upperName = recipe.name.toUpperCase();
  const stepsText = recipe.steps
    .map((step) => stepToText(step, language))
    .join('\n\n');

  return `\
*${upperName}*

${recipe.description}

${stepsText}`;
}

export function mapRecipeModelToDto(recipe: Recipe): RecipeDto {
  const categoryKeys = Array.isArray((recipe as any).categories)
    ? ((recipe as any).categories as Array<string | { key?: string }>)
        .map((c) =>
          typeof c === 'string' ? c : typeof c?.key === 'string' ? c.key : '',
        )
        .filter((k): k is string => typeof k === 'string' && k.length > 0)
    : [];

  return {
    id: recipe.id ?? 0,
    language: recipe.language ?? 'en',
    name: recipe.name ?? '',
    additional: recipe.additional ?? '',
    description: recipe.description ?? '',
    imgs: Array.isArray(recipe.imgs) ? recipe.imgs : [],
    categories: categoryKeys,
    steps: recipe.steps?.map(mapRecipeStepModelToDto) ?? [],
    // createdAt/updatedAt are server-managed; not required on save
  };
}

export function mapRecipesModelToDto(recipes: Recipe[]): RecipeDto[] {
  return recipes.map(mapRecipeModelToDto);
}

export async function fetchRecipes(): Promise<RecipesData> {
  try {
    const data = await requestWithFallback<RecipesDataResponse>(`/api/recipe`, {
      method: 'GET',
    });
    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.error(error);
  }

  return [];
}

/**
 * Fetches the most copied public recipes from the API and maps them to RecipeDto.
 * Does not depend on Foods/Common dictionaries, suitable for lightweight homepage lists.
 */
export async function fetchMostCopiedRecipes(
  quantity = 6,
  baseUrl?: string,
): Promise<RecipeDto[]> {
  const path = `/api/Recipe/most-copied?quantity=${quantity}`;

  try {
    // Try explicit baseUrl first if provided
    if (baseUrl && baseUrl.trim()) {
      const apiBase = baseUrl.replace(/\/$/, '');
      const res = await fetch(`${apiBase}${path}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        const data = (await res.json()) as ApiRecipeResponse[];
        return (Array.isArray(data) ? data : []).map<RecipeDto>(
          (recipe, index) => ({
            id: recipe.id ?? index,
            name: recipe.name ?? '',
            description: recipe.description ?? '',
            additional: recipe.additional ?? '',
            language:
              (recipe.language?.toLowerCase() as RecipeDto['language']) ?? 'pt',
            steps:
              recipe.steps?.map<RecipeStepDto>((step) => ({
                title: step.title ?? '',
                preparation: step.preparation ?? '',
                additional: step.additional ?? '',
                ingredientsText: step.ingredientsText ?? '',
              })) ?? [],
          }),
        );
      }
    }
  } catch (e) {
    // ignore and fallback
  }

  try {
    const data = await requestWithFallback<ApiRecipeResponse[]>(path, {
      method: 'GET',
      skipAuth: true,
    });
    if (!Array.isArray(data) || data.length === 0) return [];
    return data.map<RecipeDto>((recipe, index) => ({
      id: recipe.id ?? index,
      name: recipe.name ?? '',
      description: recipe.description ?? '',
      additional: recipe.additional ?? '',
      language:
        (recipe.language?.toLowerCase() as RecipeDto['language']) ?? 'pt',
      steps:
        recipe.steps?.map<RecipeStepDto>((step) => ({
          title: step.title ?? '',
          preparation: step.preparation ?? '',
          additional: step.additional ?? '',
          ingredientsText: step.ingredientsText ?? '',
        })) ?? [],
    }));
  } catch (err) {
    console.error(err);
  }

  return [];
}

export async function saveRecipe(
  recipe: RecipeDto,
  languageHeader?: Language,
): Promise<RecipesData> {
  try {
    const url = recipe.id ? `/api/recipe/${recipe.id}` : `/api/recipe`;
    // Ensure backend receives string keys explicitly as `categories`
    const payload: any = {
      ...recipe,
      ...(Array.isArray((recipe as any).categories)
        ? { categories: (recipe as any).categories }
        : {}),
    };

    const data = await requestWithFallback<RecipesDataResponse>(url, {
      method: recipe.id ? 'PUT' : 'POST',
      data: payload,
      headers: {
        ...(languageHeader ? { 'X-Language': languageHeader } : {}),
      },
    });
    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.error(error);
  }

  return RECIPES_DATA;
}

export async function removeRecipeById(id = 0): Promise<RecipesData> {
  if (!id) return RECIPES_DATA;

  try {
    const data = await requestWithFallback<RecipesDataResponse>(
      `/api/recipe/${id}`,
      { method: 'DELETE' },
    );
    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.log(error);
  }

  return RECIPES_DATA;
}

export async function fetchRecipeData(id: number): Promise<RecipeData | null> {
  if (!id) return null;
  try {
    const json = await requestWithFallback<RecipeDataResponse>(
      `/api/Recipe/${id}`,
      {
        method: 'GET',
      },
    );
    if (
      json &&
      typeof json === 'object' &&
      'recipes' in json &&
      'relatedRecipes' in json
    ) {
      return mapRecipeDataResponseToModel(json);
    }
    return null;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return null;
    }
    console.error(e);
    return null;
  }
}
