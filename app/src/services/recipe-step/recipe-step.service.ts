import { RecipeStepDto } from './recipe-step.dto';
import { RecipeStep } from './recipe-step.model';

export function mapRecipeStepModelToDto(step: RecipeStep): RecipeStepDto {
  return {
    title: step.title ?? '',
    preparation: step.preparation ?? '',
    additional: step.additional ?? '',
    ingredientsText: step.ingredientsText ?? '',
  };
}
