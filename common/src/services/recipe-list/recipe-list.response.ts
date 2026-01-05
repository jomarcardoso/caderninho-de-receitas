import type { RecipeItemSummaryResponse } from '../recipe/recipe.response';
import type { UserProfileSummaryResponse } from '../user/user.response';

export interface RecipeListResponse {
  id: number;
  name: string;
  description?: string;
  isPublic: boolean;
  owner?: UserProfileSummaryResponse;
  createdAt: string;
  updatedAt: string;
  items?: RecipeItemSummaryResponse[];
}

export interface RecipeListSummaryResponse {
  id: number;
  name: string;
  description?: string;
  isPublic: boolean;
  items?: RecipeItemSummaryResponse[];
}

export interface RecipeListIndexResponse {
  id: number;
  name: string;
  items: RecipeIndexResponse[];
}
