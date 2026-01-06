import type {
  RecipeIndex,
  RecipeItemSummary,
  RecipeSummary,
} from '../recipe/recipe.model';
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
  isPublic: boolean;
  owner?: UserProfileSummary;
  createdAt: string;
  updatedAt: string;
  items?: RecipeSummary[];
};

export interface RecipeListSummary {
  id: number;
  name: string;
  description?: string;
  isPublic: boolean;
  items?: RecipeItemSummary[];
}
