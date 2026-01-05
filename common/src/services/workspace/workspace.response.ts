import type {
  RecipeListIndexResponse,
  RecipeListSummaryResponse,
} from '../recipe-list/recipe-list.response';
import {
  RecipeIndexResponse,
  RecipeItemSummaryResponse,
} from '../recipe/recipe.response';
import type { UserProfileResponse } from '../user/user.response';

export interface WorkspaceResponse {
  userProfile: UserProfileResponse;
  recipeLists: RecipeListSummaryResponse[];
  recipes: RecipeItemSummaryResponse[];
}

export interface WorkspaceIndexResponse {
  userProfile: UserProfileResponse;
  recipeLists: RecipeListIndexResponse[];
  recipes: RecipeIndexResponse[];
}
