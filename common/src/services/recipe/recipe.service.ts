import type {
  RecipeResponse,
  RecipesDataResponse,
  RecipeDataResponse,
} from './recipe.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import { type Recipe, type RecipesData, type RecipeData, type RecipeList, type RecipeListItem } from './recipe.model';
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
import { FOOD } from '../food/food.model';
import { mapRecipeStepModelToDto } from '../recipe-step/recipe-step.service';
// (duplicate import removed)

function getApiBase(): string {
  const vite = (typeof import.meta !== 'undefined' &&
    (import.meta as any)?.env?.VITE_API_BASE_URL) as string | undefined;
  if (vite && typeof vite === 'string' && vite.trim())
    return vite.replace(/\/$/, '');
  const next = (typeof process !== 'undefined' &&
    (process.env as any)?.NEXT_PUBLIC_API_BASE_URL) as string | undefined;
  if (next && typeof next === 'string' && next.trim())
    return next.replace(/\/$/, '');
  // Prefer HTTPS default to avoid header loss on redirects from HTTP->HTTPS
  return 'https://localhost:7269';
}

function getApiBases(): string[] {
  const bases: string[] = [];
  const add = (s?: string) => { if (s && s.trim()) bases.push(s.replace(/\/$/, '')); };

  add((typeof import.meta !== 'undefined' && (import.meta as any)?.env?.VITE_API_BASE_URL) as string | undefined);
  add((typeof process !== 'undefined' && (process.env as any)?.NEXT_PUBLIC_API_BASE_URL) as string | undefined);

  try {
    if (typeof window !== 'undefined') {
      const isHttps = window.location?.protocol === 'https:';
      if (isHttps) { add('https://localhost:7269'); add('http://localhost:5106'); }
      else { add('http://localhost:5106'); add('https://localhost:7269'); }
    }
  } catch {}

  add('https://localhost:7269');
  add('http://localhost:5106');

  return Array.from(new Set(bases));
}

async function fetchWithFallback(path: string, init?: RequestInit): Promise<Response> {
  const bases = getApiBases();
  let lastErr: unknown;
  for (const base of bases) {
    try {
      const res = await fetch(`${base}${path}`, init);
      return res;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error('Failed to fetch');
}

function getTemporaryOwnerId(): string | undefined {
  try {
    if (typeof window === 'undefined') return undefined;
    const raw = window.localStorage.getItem('caderninho-de-receitas:google-user');
    if (!raw) return undefined;
    const obj = JSON.parse(raw);
    const id = (obj?.googleId ?? obj?.GoogleId ?? obj?.googleID) as string | undefined;
    if (typeof id === 'string' && id.trim()) return id.trim();
  } catch {}
  // Fallback to cookie if localStorage missing
  try {
    if (typeof document !== 'undefined' && typeof document.cookie === 'string') {
      const match = document.cookie.split(';').map(s => s.trim()).find(s => s.startsWith('x-temp-owner='));
      if (match) {
        const v = decodeURIComponent(match.split('=')[1] || '');
        if (v && v.trim()) return v.trim();
      }
    }
  } catch {}
  return undefined;
}

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
  return {
    id: recipe.id ?? 0,
    language: recipe.language ?? 'en',
    name: recipe.name ?? '',
    additional: recipe.additional ?? '',
    description: recipe.description ?? '',
    categories: Array.isArray((recipe as any).categories)
      ? ((recipe as any).categories as Array<{ key?: string }>)
          .map((c) => c?.key)
          .filter((k): k is string => typeof k === 'string' && k.length > 0)
      : [],
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

  const categoryKeys: string[] = Array.isArray(
    (recipeResponse as any).categories,
  )
    ? ((recipeResponse as any).categories as string[])
    : [];

  const categories = categoryKeys
    .map((key) => {
      const entry = (dataResponse as any)?.recipeCategories?.[key];
      if (!entry) return null;
      return { key, text: entry.text, pluralText: entry.pluralText };
    })
    .filter((x): x is { key: string; text: any; pluralText: any } =>
      Boolean(x),
    );

  return {
    ...recipeResponse,
    ...mapAllNutrientsResponseToModel(recipeResponse, dataResponse),
    food,
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
  const mappedRecipes = mapAllRecipesResponseToModel(data);
  const byId = new Map<number, Recipe>();
  for (const r of mappedRecipes) {
    if (typeof r.id === 'number') byId.set(r.id, r);
  }

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
    const tempOwner = getTemporaryOwnerId();
    const res = await fetchWithFallback(`/api/recipe`, {
      headers: {
        ...(tempOwner ? { 'X-Temporary-Owner': tempOwner } : {}),
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch recipes: ${res.status}`);
    }

    const data: RecipesDataResponse = await res.json();

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
        return (Array.isArray(data) ? data : []).map<RecipeDto>((recipe, index) => ({
          id: recipe.id ?? index,
          name: recipe.name ?? '',
          description: recipe.description ?? '',
          additional: recipe.additional ?? '',
          language: (recipe.language?.toLowerCase() as RecipeDto['language']) ?? 'pt',
          steps:
            recipe.steps?.map<RecipeStepDto>((step) => ({
              title: step.title ?? '',
              preparation: step.preparation ?? '',
              additional: step.additional ?? '',
              ingredientsText: step.ingredientsText ?? '',
            })) ?? [],
        }));
      }
    }
  } catch (e) {
    // ignore and fallback
  }

  try {
    const res = await fetchWithFallback(path, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Failed to fetch most-copied: ${res.status}`);
    const data = (await res.json()) as ApiRecipeResponse[];
    if (!Array.isArray(data) || data.length === 0) return [];
    return data.map<RecipeDto>((recipe, index) => ({
      id: recipe.id ?? index,
      name: recipe.name ?? '',
      description: recipe.description ?? '',
      additional: recipe.additional ?? '',
      language: (recipe.language?.toLowerCase() as RecipeDto['language']) ?? 'pt',
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
    const tempOwner = getTemporaryOwnerId();
    const res = await fetchWithFallback(url, {
      method: recipe.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(languageHeader ? { 'X-Language': languageHeader } : {}),
        ...(tempOwner ? { 'X-Temporary-Owner': tempOwner } : {}),
      },
      body: JSON.stringify(recipe),
    });
    if (!res.ok) {
      throw new Error('Failed to save recipe');
    }

    const data: RecipesDataResponse = await res.json();

    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.error(error);
  }

  return RECIPES_DATA;
}

export async function removeRecipeById(id = 0): Promise<RecipesData> {
  if (!id) return RECIPES_DATA;

  try {
    const tempOwner = getTemporaryOwnerId();
    const res = await fetchWithFallback(`/api/recipe/${id}`, {
      method: 'DELETE',
      headers: {
        ...(tempOwner ? { 'X-Temporary-Owner': tempOwner } : {}),
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to delete recipe: ${res.status}`);
    }

    const data: RecipesDataResponse = await res.json();

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
    const res = await fetchWithFallback(`/api/Recipe/public/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = (await res.json()) as any;

    if (
      json &&
      typeof json === 'object' &&
      'recipes' in json &&
      'relatedRecipes' in json
    ) {
      return mapRecipeDataResponseToModel(json as RecipeDataResponse);
    }

    // Unexpected response shape
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}




