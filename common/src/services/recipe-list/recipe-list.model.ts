import type {
  RecipeIndex,
  RecipeItemSummary,
  RecipeSummary,
} from '../recipe/recipe.model';
import type { Visibility } from '../common/common.types';
import type { UserProfileSummary } from '../user/user.model';

export type RecipeListIndex = {
  id: number;
  name: string;
  items: RecipeIndex[];
};

export type RecipeList = {
  id: number;
  name: string;
  description?: string | null;
  visibility: Visibility;
  owner?: UserProfileSummary;
  createdAt: string;
  updatedAt: string;
  items?: RecipeSummary[];
};

export interface RecipeListSummary {
  id: number;
  name: string;
  description?: string;
  visibility: Visibility;
  items?: RecipeItemSummary[];
}
