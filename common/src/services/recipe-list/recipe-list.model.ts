import type { RecipeSummary } from '../recipe/recipe.model';
import type { RecipeIndex } from '../recipe/recipe.response';
import type { UserProfileSummaryResponse } from '../user/user.response';

export type RecipeListIndex = {
  id: number;
  name: string;
  items: RecipeIndex[];
};

export type RecipeList = {
  id: number;
  name: string;
  description?: string | null;
  isPublic: boolean;
  owner?: UserProfileSummaryResponse;
  createdAt: string;
  updatedAt: string;
  items?: RecipeSummary[];
};
