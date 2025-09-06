export interface RecipeDto {
  name: string;
  description: string;
  additional: string;
  steps: RecipeStepDto[];
}

// Para updates
export interface UpdateRecipeDto extends RecipeDto {
  id: number;
}
