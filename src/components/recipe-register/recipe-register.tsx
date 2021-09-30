import React, { FC, useContext, useCallback } from 'react';
import { Formik, FormikProps } from 'formik';
import { RecipeData, RECIPE_DATA } from '../../services/recipe';
import AccountContext from '../../contexts/account-context';
import { RECIPE_STEP_DATA } from '../../services/recipe/recipe.types';
import RecipeRegisterForm, { RecipeForm } from './recipe-register-form';

interface Props {
  recipeData: RecipeData;
  setCurrentRecipeData(data: RecipeData): void;
}

const RecipeRegister: FC<Props> = ({
  recipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  const { setAccount } = useContext(AccountContext);

  const memoizedHandleSubmit = useCallback(
    ({
      name = '',
      description = '',
      steps: stepsData = [],
      category = '',
    }: RecipeForm): void => {
      if (!setAccount) return;

      const newRecipeData: RecipeData = {
        steps: stepsData,
        name,
        description,
        id: recipeData?.id ?? 0,
        category,
      };

      const id = setAccount.recipe(newRecipeData);

      setCurrentRecipeData({
        ...newRecipeData,
        id,
      });
    },
    [recipeData?.id, setAccount, setCurrentRecipeData],
  );

  return (
    <Formik
      initialValues={{
        name: recipeData.name,
        description: recipeData.description,
        category: recipeData.category,
        steps: recipeData.steps.length ? recipeData.steps : [RECIPE_STEP_DATA],
        quantitySteps: recipeData.steps.length || 1,
      }}
      onSubmit={memoizedHandleSubmit}
    >
      {(formik: FormikProps<RecipeForm>) => <RecipeRegisterForm {...formik} />}
    </Formik>
  );
};

export default RecipeRegister;
