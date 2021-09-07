import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '../container/container';
import RecipeRegister from '../recipe-register/recipe-register';
import { RecipeData, RECIPE_DATA } from '../../services/recipe';

export interface RecipeRegisterContainerProps {
  onNewRecipe(): void;
  currentRecipeData: RecipeData;
  setCurrentRecipeData(data: RecipeData): void;
}

const RecipeRegisterContainer: FC<RecipeRegisterContainerProps> = ({
  currentRecipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <RecipeRegister
            recipeData={currentRecipeData}
            setCurrentRecipeData={setCurrentRecipeData}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeRegisterContainer;
