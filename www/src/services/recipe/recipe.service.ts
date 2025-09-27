import { RecipeResponse, RecipesDataResponse } from './recipe.response';
import { CommonResponse } from '../common/common.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import { Recipe, RecipesData } from './recipe.model';
import { RecipeDto } from './recipe.dto';
import { translate } from '../language/language.service';
import { Language } from '../language/language.types';
import {
  mapFoodResponseToModel,
  mapFoodsDataResponseToModel,
} from '../food/food.service';
import { RECIPES_DATA } from './recipe.data';
import { RecipeStepDto } from '../recipe-step';
import { mapCommonResponseToModel } from '../common/common.service';
import { mapIngredientResponseToModel } from '../ingredient/ingredient.service';

function stepToText(step: RecipeStepDto, language: Language): string {
  const suffix = step.title ? ` ${step.title}` : '';
  const ingredientsHeading = translate('recipeStepIngredientsHeading', language, { suffix });
  const preparationHeading = translate('recipeStepPreparationHeading', language, { suffix });

  return `\
${ingredientsHeading}

${step.ingredientsText}

${preparationHeading}

${step.title}`;
}

export function recipeDtoToText(recipe: RecipeDto, language: Language = 'pt'): string {
  const upperName = recipe.name.toUpperCase();
  const stepsText = recipe.steps
    .map((step) => stepToText(step, language))
    .join('\n\n');

  return `\
*${upperName}*

${recipe.description}

${stepsText}`;

}

type RecipeStepLike = Pick<
  RecipeStepDto,
  'title' | 'preparation' | 'additional' | 'ingredientsText'
>;

type RecipeLike = Pick<
  RecipeDto,
  'id' | 'name' | 'description' | 'additional' | 'steps'
> & {
  steps?: RecipeStepLike[];
};

function mapRecipeStepModelToDto(step: RecipeStepLike): RecipeStepDto {
  return {
    title: step.title ?? '',
    preparation: step.preparation ?? '',
    additional: step.additional ?? '',
    ingredientsText: step.ingredientsText ?? '',
  };
}

export function mapRecipeModelToDto(recipe: RecipeLike): RecipeDto {
  return {
    id: recipe.id,
    name: recipe.name ?? '',
    description: recipe.description ?? '',
    additional: recipe.additional ?? '',
    steps: recipe.steps?.map(mapRecipeStepModelToDto) ?? [],
  };
}

export function mapRecipesModelToDto(recipes: RecipeLike[]): RecipeDto[] {
  return recipes.map(mapRecipeModelToDto);
}

export function mapRecipeResponseToModel(
  recipeResponse: RecipeResponse,
  dataResponse: RecipesDataResponse,
): Recipe {
  return {
    ...recipeResponse,
    ...mapAllNutrientsResponseToModel(recipeResponse, dataResponse),
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
  console.log(data);

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
    const data: RecipesDataResponse = await res.json();

    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.log(error);
  }

  return RECIPES_DATA;
}

export async function saveRecipe(recipe: RecipeDto): Promise<RecipesData> {
  try {
    const res = await fetch('http://localhost:5106/api/recipe', {
      method: recipe.id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    const data: RecipesDataResponse = await res.json();

    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.log(error);
  }

  return RECIPES_DATA;
}

export async function removeRecipeById(id = 0): Promise<RecipesData> {
  if (!id) return RECIPES_DATA;

  try {
    const res = await fetch('http://localhost:5106/api/recipe', {
      method: 'DELETE',
    });
    const data: RecipesDataResponse = await res.json();

    return mapRecipesDataResponseToModel(data);
  } catch (error) {
    console.log(error);
  }

  return RECIPES_DATA;
}
