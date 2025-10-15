import type { RecipeResponse, RecipesDataResponse } from './recipe.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import { type Recipe, type RecipesData } from './recipe.model';
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
import type { RecipeStepDto } from '../recipe-step';

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
    steps: recipe.steps?.map(mapRecipeStepModelToDto) ?? [],
  };
}

export function mapRecipesModelToDto(recipes: Recipe[]): RecipeDto[] {
  return recipes.map(mapRecipeModelToDto);
}

export function mapRecipeResponseToModel(
  recipeResponse: RecipeResponse,
  dataResponse: RecipesDataResponse,
): Recipe {
  const foodResponse = dataResponse.foods.find(
    (food) => food.id === recipeResponse.food,
  );

  const food = foodResponse
    ? mapFoodResponseToModel(foodResponse, dataResponse)
    : FOOD;

  return {
    ...recipeResponse,
    ...mapAllNutrientsResponseToModel(recipeResponse, dataResponse),
    food,
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

  return {
    ...foodsData,
    recipes: mapAllRecipesResponseToModel(data),
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
    const res = await fetch('http://localhost:5106/api/recipe');
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

/**
 * Fetches the most copied public recipes from the API and maps them to RecipeDto.
 * Does not depend on Foods/Common dictionaries, suitable for lightweight homepage lists.
 */
export async function fetchMostCopiedRecipes(
  quantity = 6,
  baseUrl?: string,
): Promise<RecipeDto[]> {
  const apiBase = (baseUrl ?? '').replace(/\/$/, '') || 'http://localhost:5106';

  try {
    const res = await fetch(`${apiBase}/api/Recipe/most-copied?quantity=${quantity}`, {
      headers: { 'Content-Type': 'application/json' },
      // Let callers decide caching; most environments can layer cache outside
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch most-copied: ${res.status}`);
    }

    const data = (await res.json()) as ApiRecipeResponse[];

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

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
    const url = recipe.id
      ? `http://localhost:5106/api/recipe/${recipe.id}`
      : 'http://localhost:5106/api/recipe';
    const res = await fetch(url, {
      method: recipe.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(languageHeader ? { 'X-Language': languageHeader } : {}),
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
    const res = await fetch(`http://localhost:5106/api/recipe/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to save recipe');
    }

    const data: RecipesDataResponse = await res.json();

    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.log(error);
  }

  return RECIPES_DATA;
}
