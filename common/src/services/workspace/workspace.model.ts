import { RecipeIndex, RecipeItemSummary } from '../recipe/recipe.model';
import {
  RecipeListIndex,
  RecipeListSummary,
} from '../recipe-list/recipe-list.model';
import type { UserProfile } from '../user/user.model';

export interface Workspace {
  userProfile: UserProfile;
  recipeLists: RecipeListSummary[];
  recipes: RecipeItemSummary[];
}

export interface WorkspaceIndex {
  userProfile: UserProfile;
  recipeLists: RecipeListIndex[];
  recipes: RecipeIndex[];
}
