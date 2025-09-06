import { Ingredient } from '../ingredient/ingredient.model';
import { RecipeStepBase } from './recipe-step.types';

export type RecipeStep = RecipeStepBase<Ingredient>;
