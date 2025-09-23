import { RecipeResponse, RecipesDataResponse } from './recipe.response';
import { CommonResponse } from '../common/common.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import { Recipe, RecipesData } from './recipe.model';
import { RecipeDto } from './recipe.dto';
import { mapAllFoodsResponseToModel } from '../food/food.service';
import { RECIPES_DATA } from './recipe.data';

// function stepToText(step: RecipeStep): string {
//   return `\
// Ingredientes ${step.title}

// ${step.ingredients}

// Modo de preparo ${step.title}

// ${step.title}`;
// }

// export function formatToText(recipe: Recipe): string {
//   return `\
// *${recipe.title.toUpperCase()}*

// ${recipe.description}

// ${recipe.steps.map(stepToText)}`;
// }

export function mapRecipeResponseToModel(
  recipeResponse: RecipeResponse,
  commonResponse: CommonResponse,
): Recipe {
  return {
    ...recipeResponse,
    ...mapAllNutrientsResponseToModel(recipeResponse, commonResponse),
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
  return {
    recipes: mapAllRecipesResponseToModel(data),
    foods: mapAllFoodsResponseToModel(data),
    measures: Object.values(data.measures),
    foodTypes: Object.values(data.foodTypes),
    measurementUnits: Object.values(data.measurementUnits),
    vitamins: Object.values(data.vitamins),
    aminoAcids: Object.values(data.aminoAcids),
    minerals: Object.values(data.minerals),
    nutritionalInformation: Object.values(data.nutritionalInformation),
  };
  // return data.recipes.map((recipe) => mapRecipeResponseToModel(recipe, data));
}

export async function fetchRecipes(): Promise<RecipesData> {
  try {
    const res = await fetch('http://localhost:5106/api/food');
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
