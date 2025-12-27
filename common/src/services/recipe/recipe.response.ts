import type {
  FoodSummaryResponse,
  FoodsDataResponse,
} from '../food/food.response';
import type { AllNutrientsResponse } from '../nutrient/nutrient.response';
import type { NutrientsResponse } from '../nutrient/nutrient.response';
import type { RecipeStepResponse } from '../recipe-step';
import type { RecipeBase } from './recipe.types';

export interface RecipeSummaryResponse {
  id: number;
  name: string;
  imgs: string[];
  author?: {
    id: string;
    name?: string;
    img?: string;
  };
  savedByOthersCount: number;
  nutritionalInformation: NutrientsResponse;
  isOwner: boolean;
}

export interface RecipeResponse
  extends RecipeBase<RecipeStepResponse>,
    AllNutrientsResponse {
  food: FoodSummaryResponse;
  isOwner?: boolean;
  author?: {
    id: string;
    name?: string;
    img?: string;
  };
}

export interface RecipesDataResponse extends FoodsDataResponse {
  recipes: RecipeResponse[];
  // Optional: user recipe lists included in the bulk payload
  recipeLists?: RecipeListResponse[];
}

export interface RecipeDataResponse extends FoodsDataResponse {
  recipes: RecipeResponse;
  relatedRecipes: RecipeResponse[];
}

// Recipe lists (shared minimal shape)
export interface RecipeListItemResponse {
  recipeListId: number;
  recipeId: number;
  position: number;
  createdAt: string;
}

export interface RecipeListResponse {
  id: number;
  ownerId: string;
  name: string;
  description?: string;
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
  items?: RecipeListItemResponse[];
}
