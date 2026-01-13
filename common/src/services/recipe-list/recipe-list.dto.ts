import type { Visibility } from '../common/common.types';

export interface RecipeListDto {
  name: string;
  description?: string | null;
  visibility?: Visibility;
}
