import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '../container/container';
import RecipeRegister from '../recipe-register/recipe-register';
import { RECIPE, Recipe, RecipeData, RECIPE_DATA } from '../../services/recipe';

export interface RecipeRegisterContainerProps {
  recipe: Recipe;
  onNewRecipe(): void;
  currentRecipeData: RecipeData;
  setCurrentRecipeData(data: RecipeData): void;
}

const RecipeRegisterContainer: FC<RecipeRegisterContainerProps> = ({
  recipe = RECIPE,
  currentRecipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <RecipeRegister
            recipeData={currentRecipeData}
            recipe={recipe}
            setCurrentRecipeData={setCurrentRecipeData}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeRegisterContainer;
