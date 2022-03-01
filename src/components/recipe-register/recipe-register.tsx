import React, { FC, useContext, useCallback } from 'react';
import { Formik, FormikProps } from 'formik';
import { RecipeData, RECIPE_DATA } from '../../services/recipe';
import AccountContext from '../../contexts/account-context';
import { RECIPE_STEP_DATA } from '../../services/recipe/recipe.types';
import RecipeRegisterForm, { RecipeForm } from './recipe-register-form';
import AlertEmptyRecipe from '../alert-empty-recipe/alert-empty-recipe';
import Button from '../button/button';
import EditingContext from '../../contexts/editing-context';
import CurrentRecipeContext from '../../contexts/current-recipe';

interface Props {
  recipeData: RecipeData;
  setCurrentRecipeData(data: RecipeData): void;
}

const RecipeRegister: FC<Props> = ({
  recipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  const { setAccount } = useContext(AccountContext);
  const { restoreLastRecipe, currentRecipeData } =
    useContext(CurrentRecipeContext);
  const [openedEmptyRecipe, setOpenedEmptyRecipe] = React.useState(false);
  const { setEditing } = useContext(EditingContext);

  const handleCloseEmptyAlert = useCallback(() => {
    setOpenedEmptyRecipe(false);
  }, []);

  const handleCancel = useCallback(() => {
    if (!currentRecipeData.id) {
      if (restoreLastRecipe) restoreLastRecipe();
    }

    if (setEditing) setEditing(false);
  }, [currentRecipeData.id, restoreLastRecipe, setEditing]);

  const memoizedHandleSubmit = useCallback(
    ({
      name = '',
      description = '',
      steps: stepsData = [],
      category = '',
    }: RecipeForm): void => {
      if (!setAccount) return;

      if (!name) {
        setOpenedEmptyRecipe(true);

        return;
      }

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
    <>
      <Formik
        initialValues={{
          name: recipeData?.name ?? '',
          description: recipeData?.description ?? '',
          additional: recipeData?.additional ?? '',
          category: recipeData?.category ?? '',
          steps: recipeData?.steps?.length
            ? recipeData.steps
            : [RECIPE_STEP_DATA],
          quantitySteps: recipeData?.steps?.length || 1,
        }}
        onSubmit={memoizedHandleSubmit}
      >
        {(formik: FormikProps<RecipeForm>) => (
          <RecipeRegisterForm
            recipeData={recipeData}
            onCancel={handleCancel}
            {...formik}
          />
        )}
      </Formik>
      <AlertEmptyRecipe
        open={openedEmptyRecipe}
        title="erro ao cadastrar uma nova receita"
        contentText="A receita precisa ter um nome. Deseja cancelar o cadastro ou preencher o nome e continuar?"
        actions={
          <>
            <Button color="secondary" onClick={handleCancel}>
              cancelar
            </Button>
            <Button onClick={handleCloseEmptyAlert} autoFocus>
              continuar
            </Button>
          </>
        }
      />
    </>
  );
};

export default RecipeRegister;
