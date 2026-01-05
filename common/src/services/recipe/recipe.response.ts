import type { FoodSummaryResponse } from '../food/food.response';
import type {
  AllNutrientsResponse,
  NutrientsResponse,
} from '../nutrient/nutrient.response';
import type { RecipeStepResponse } from '../recipe-step';
import type { UserProfileSummaryResponse } from '../user/user.response';
import type { Language } from '../language/language.types';
import type { LanguageText } from '../language/language.types';

export interface RecipeIndexResponse {
  id: number;
  name: string;
}

export interface RecipeItemSummaryResponse {
  id: number;
  name: string;
  imgs: string[];
  savedByOthersCount: number;
  nutritionalInformation: NutrientsResponse;
  isOwner: boolean;
}

export interface RecipeSummaryResponse {
  id: number;
  name: string;
  imgs: string[];
  owner?: UserProfileSummaryResponse;
  savedByOthersCount: number;
  nutritionalInformation: NutrientsResponse;
  isOwner: boolean;
}

export interface RecipeResponse extends AllNutrientsResponse {
  id: number;
  name: string;
  keys: string;
  description?: string | null;
  additional?: string | null;
  steps: RecipeStepResponse[];
  language: Language;
  categories?: string[]; // slugs
  food: FoodSummaryResponse;
  imgs: string[];
  savedByOthersCount: number;
  createdAt?: string;
  updatedAt?: string;
  owner?: UserProfileSummaryResponse;
  isOwner?: boolean;
  shareToken?: string | null;
  relatedRecipes?: RecipeSummaryResponse[];
}

export interface RecipeCategoryResponse {
  id: number;
  name: LanguageText;
  namePlural: LanguageText;
  description: LanguageText;
  key: string; // slug/camel
  url: string; // kebab-case
  img: string;
  bannerImg: string;
}
