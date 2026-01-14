import { FoodSummary } from '../food/food.model';
import type { Language, LanguageText } from '../language/language.types';
import type { AllNutrients } from '../nutrient/nutrient.model';
import { Nutrients } from '../nutrient/nutrient.response';
import type { RecipeStep } from '../recipe-step';
import type { UserProfileSummary } from '../user/user.model';
import type { Visibility } from '../common/common.types';

export interface RecipeIndex {
  id: number;
  name: string;
}

export interface RecipeItemSummary extends RecipeIndex {
  imgs: string[];
  savedByOthersCount: number;
  nutritionalInformation: Nutrients;
  isOwner: boolean;
  visibility?: Visibility;
}

export interface RecipeSummary extends RecipeItemSummary {
  owner?: UserProfileSummary;
}

export interface Recipe extends AllNutrients {
  id: number;
  name: string;
  keys: string;
  description?: string | null;
  additional?: string | null;
  steps: RecipeStep[];
  language: Language;
  categories?: string[]; // slugs
  food: FoodSummary;
  imgs: string[];
  savedByOthersCount: number;
  createdAt?: string;
  updatedAt?: string;
  owner?: UserProfileSummary;
  author?: UserProfileSummary | null;
  copiedFromRecipeId?: number | null;
  isOwner?: boolean;
  visibility?: Visibility;
  shareToken?: string | null;
  relatedRecipes?: RecipeSummary[];
}

export interface RecipeCategory {
  id: number;
  name: LanguageText;
  namePlural: LanguageText;
  description: LanguageText;
  key: string; // slug/camel
  url: string; // kebab-case
  img: string;
  bannerImg: string;
}
