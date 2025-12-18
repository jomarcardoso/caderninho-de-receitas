import type { Food } from '../food/food.model';
import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import type { AllNutrientsData } from '../nutrient-data/nutrient-data.model';
import type { AllNutrients } from '../nutrient/nutrient.model';
import type { RecipeStep } from '../recipe-step';
import type { RecipeBase } from './recipe.types';
export interface Recipe extends RecipeBase<RecipeStep>, AllNutrients {
  food: Food;
  categories?: string[];
  isOwner?: boolean;
  author?: {
    id: string;
    displayName?: string;
    pictureUrl?: string;
  };
}

export interface RecipesData extends AllNutrientsData {
  recipes: Recipe[];
  foods: Food[];
  measures: LanguageTextAndPlural[];
  foodTypes: LanguageText[];
  measurementUnits: LanguageTextAndPlural[];
  recipeCategories?: import('../common/common.model').Category[];
  recipeLists?: RecipeList[];
}

export interface RecipeData extends AllNutrientsData {
  recipe: Recipe;
  relatedRecipes: Recipe[];
  foods: Food[];
  measures: LanguageTextAndPlural[];
  foodTypes: LanguageText[];
  measurementUnits: LanguageTextAndPlural[];
}

export type RecipeListItem = {
  recipeListId: number;
  recipe: Recipe;
  position: number;
  createdAt: string;
};

export type RecipeList = {
  id: number;
  ownerId: string;
  name: string;
  description?: string | null;
  isPublic?: boolean;
  createdAt: string;
  updatedAt: string;
  items?: RecipeListItem[];
};
