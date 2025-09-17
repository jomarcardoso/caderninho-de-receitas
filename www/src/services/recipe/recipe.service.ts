import { RecipeResponse, RecipesResponse } from './recipe.response';
import { CommonResponse } from '../common/common.response';
import { mapAllNutrientsResponseToModel } from '../nutrient/nutrient.service';
import { Recipe } from './recipe.model';

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

export function mapAllRecipesResponseToModel(data: RecipesResponse): Recipe[] {
  return data.recipes.map((recipe) => mapRecipeResponseToModel(recipe, data));
}

export async function fetchRecipes(): Promise<Recipe[]> {
  try {
    const res = await fetch('http://localhost:5106/api/food');
    const data: RecipesResponse = await res.json();

    return mapAllRecipesResponseToModel(data);
  } catch (error) {
    console.log(error);
  }

  return [];
}
