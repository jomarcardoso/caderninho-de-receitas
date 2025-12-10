import type {
  RecipeResponse,
  RecipesDataResponse,
  RecipeDataResponse,
} from './recipe.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import axios from 'axios';
import {
  type Recipe,
  type RecipesData,
  type RecipeData,
  type RecipeList,
  type RecipeListItem,
} from './recipe.model';
import type { RecipeDto } from './recipe.dto';
import { translate } from '../language/language.service';
import { type Language } from '../language/language.types';
import {
  mapFoodResponseToModel,
  mapFoodsDataResponseToModel,
} from '../food/food.service';
import { RECIPES_DATA } from './recipe.data';
import { type RecipeStepDto } from '../recipe-step';
import { mapIngredientResponseToModel } from '../ingredient/ingredient.service';
import type {
  AllNutrients,
  Nutrient,
} from '../nutrient/nutrient.model';
import type {
  AllNutrientsResponse,
  NutrientsResponse,
} from '../nutrient/nutrient.response';
import { FOOD } from '../food/food.model';
import { mapRecipeStepModelToDto } from '../recipe-step/recipe-step.service';
import {
  getApiBase,
  getApiBases,
} from '../http/api-base';
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
          typeof c === 'string'
            ? c
            : typeof c?.key === 'string'
            ? c.key
            : '',
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

export function mapRecipeResponseToModel(
  recipeResponse: RecipeResponse,
  dataResponse: import('../food/food.response').FoodsDataResponse,
): Recipe {
  const foodResponse = dataResponse.foods.find(
    (food) => food.id === recipeResponse.food,
  );

  const food = foodResponse
    ? mapFoodResponseToModel(foodResponse, dataResponse)
    : FOOD;

  const categoryKeys: string[] = Array.isArray((recipeResponse as any).categories)
    ? ((recipeResponse as any).categories as string[])
    : [];

  const categories = categoryKeys
    .map((raw) => {
      const key = typeof raw === 'string' ? raw.trim() : '';
      if (!key) return null;
      const entry = (dataResponse as any)?.recipeCategories?.[key];
      if (!entry) return { key, text: { en: key, pt: key }, pluralText: { en: key, pt: key } };
      return { key, text: entry.text, pluralText: entry.pluralText };
    })
    .filter((x): x is { key: string; text: any; pluralText: any } => Boolean(x));

  // Fallback: aggregate nutrients from steps when top-level nutrients are missing
  const topLevel: AllNutrients = mapAllNutrientsResponseToModel(
    recipeResponse as unknown as AllNutrientsResponse,
    dataResponse,
  );

  function aggregateFromSteps(): AllNutrients {
    const zero = {} as Record<string, number>;
    const addInto = (acc: Record<string, number>, src?: Record<string, number>) => {
      if (!src) return acc;
      for (const [k, v] of Object.entries(src)) {
        const n = typeof v === 'number' ? v : 0;
        acc[k] = (acc[k] ?? 0) + n;
      }
      return acc;
    };

    const sums = (recipeResponse.steps ?? []).reduce(
      (acc, s: any) => {
        addInto(acc.ni, s?.nutritionalInformation);
        addInto(acc.mi, s?.minerals);
        addInto(acc.vi, s?.vitamins);
        addInto(acc.aa, s?.aminoAcids);
        addInto(acc.eaa, s?.essentialAminoAcids);
        return acc;
      },
      { ni: { ...zero }, mi: { ...zero }, vi: { ...zero }, aa: { ...zero }, eaa: { ...zero } },
    );

    const agg: AllNutrientsResponse = {
      nutritionalInformation: sums.ni as NutrientsResponse,
      minerals: sums.mi as NutrientsResponse,
      vitamins: sums.vi as NutrientsResponse,
      aminoAcids: sums.aa as NutrientsResponse,
      essentialAminoAcids: sums.eaa as NutrientsResponse,
      aminoAcidsScore: 0,
    };

    return mapAllNutrientsResponseToModel(agg, dataResponse);
  }

  const needsFallback =
    (topLevel?.nutritionalInformation?.length ?? 0) === 0 &&
    Array.isArray(recipeResponse?.steps) &&
    recipeResponse.steps.length > 0;

  const allNutrients: AllNutrients = needsFallback ? aggregateFromSteps() : topLevel;

  return {
    ...recipeResponse,
    ...allNutrients,
    food,
    author: recipeResponse.author
      ? {
          id: recipeResponse.author.id,
          displayName: recipeResponse.author.displayName,
          pictureUrl: recipeResponse.author.pictureUrl,
        }
      : undefined,
    categories,
    steps: recipeResponse.steps.map((stepResponse) => ({
      ...stepResponse,
      ...mapAllNutrientsResponseToModel(stepResponse, dataResponse),
      ingredients: stepResponse.ingredients.map((ingredient) =>
        mapIngredientResponseToModel(
          ingredient,
          mapFoodsDataResponseToModel(dataResponse),
          dataResponse,
        ),
      ),
    })),
  };
}

// export async function fetchRecipeById(id = 0): Promise<Recipe | null> {
//   if (!id) return null;

//   try {
//     const res = await fetch('http://localhost:5106/api/recipe/' + id);
//     const data: RecipeResponse = await res.json();

//     return mapRecipeResponseToModel(data);
//   } catch (error) {
//     console.log(error);
//   }

//   return null;
// }

export function mapAllRecipesResponseToModel(
  data: RecipesDataResponse,
): Recipe[] {
  return data.recipes.map((recipe) => mapRecipeResponseToModel(recipe, data));
}

export function mapRecipesDataResponseToModel(
  data: RecipesDataResponse,
): RecipesData {
  const foodsData = mapFoodsDataResponseToModel(data);

  // Pre-map all recipes and index by id for quick lookup when hydrating lists
  const mappedRecipesAll = mapAllRecipesResponseToModel(data);
  const byId = new Map<number, Recipe>();
  for (const r of mappedRecipesAll) {
    if (typeof r.id === 'number') byId.set(r.id, r);
  }

  // Compute the set of recipe ids that appear in any list
  const listedIds = new Set<number>();
  for (const l of data.recipeLists ?? []) {
    for (const it of l.items ?? []) {
      if (typeof (it as any)?.recipeId === 'number')
        listedIds.add((it as any).recipeId);
    }
  }

  // Business rule: do not show recipes "soltas" that are already organized in some list
  const mappedRecipes = mappedRecipesAll.filter(
    (r) => !listedIds.has(r.id as number),
  );

  return {
    ...foodsData,
    recipes: mappedRecipes,
    recipeLists: (data.recipeLists ?? []).map((l) => ({
      id: l.id,
      ownerId: l.ownerId,
      name: l.name,
      description: l.description ?? null,
      createdAt: l.createdAt,
      updatedAt: l.updatedAt,
      items: (l.items ?? []).map((it) => ({
        recipeListId: it.recipeListId,
        recipe:
          byId.get(it.recipeId) ??
          (() => {
            const fromResp = (data.recipes || []).find(
              (rr: any) => rr?.id === it.recipeId,
            );
            return fromResp
              ? mapRecipeResponseToModel(fromResp, data as any)
              : ({} as Recipe);
          })(),
        position: it.position,
        createdAt: it.createdAt,
      })),
    })),
  };
  // return data.recipes.map((recipe) => mapRecipeResponseToModel(recipe, data));
}

// export async function fetchRecipeById(id = 0): Promise<Recipe | null> {
//   if (!id) return null;

//   try {
//     const res = await fetch('http://localhost:5106/api/recipe/' + id);
//     const data: RecipeResponse = await res.json();
//     const recipe = mapRecipeResponseToModel(data, {
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
//   return null;
// }

export async function fetchRecipes(): Promise<RecipesData> {
  try {
    const data = await requestWithFallback<RecipesDataResponse>(`/api/recipe`, {
      method: 'GET',
    });
    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.error(error);
  }

  return RECIPES_DATA;
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

export function mapRecipeDataResponseToModel(
  data: RecipeDataResponse,
): RecipeData {
  const foodsData = mapFoodsDataResponseToModel(data);
  const recipe = mapRecipeResponseToModel(data.recipes, data as any);
  const relatedRecipes = (data.relatedRecipes ?? []).map((r) =>
    mapRecipeResponseToModel(r, data as any),
  );
  return { ...foodsData, recipe, relatedRecipes };
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
