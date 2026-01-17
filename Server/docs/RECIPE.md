# Recipe documentation

## Workflow

- Endpoint: RecipeController.CreateRecipe(RecipeDto)
- RecipeController.CreateRecipeInternalAsync(RecipeDto)
- RecipeService.DtoToEntity(RecipeDto)
- RecipeService.BuildRevisionAsync(RecipeDto)
  - Recipe.Food = FoodService.FindFoodByPossibleName
