import { FoodSummaryResponse } from '../food/food.response';
import type { Language } from '../language/language.types';
import type { AllNutrients } from '../nutrient/nutrient.model';
import type { RecipeStep } from '../recipe-step';
import type { UserProfileSummaryResponse } from '../user/user.response';

export interface Recipe extends AllNutrients {
  id: number;
  name: string;
  keys: string;
  description?: string | null;
  additional?: string | null;
  steps: RecipeStep[];
  language: Language;
  categories?: string[];
  food: FoodSummaryResponse;
  imgs: string[];
  savedByOthersCount: number;
  createdAt?: string;
  updatedAt?: string;
  owner?: UserProfileSummaryResponse;
  isOwner?: boolean;
  shareToken?: string | null;
  relatedRecipes?: RecipeSummary[];
}

export interface RecipeSummary {
  id: number;
  name: string;
  imgs: string[];
  owner?: UserProfileSummaryResponse;
  savedByOthersCount: number;
  nutritionalInformation: Record<string, number>;
  isOwner: boolean;
}
