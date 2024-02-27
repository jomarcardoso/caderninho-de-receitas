import React, { FC, useContext, useCallback } from 'react';
import { Formik, FormikProps } from 'formik';
import { RecipeData, RECIPE_DATA } from '../../services/recipe';
import RecipesContext from '../../contexts/recipes-context';
import { RECIPE_STEP_DATA } from '../../services/recipe/recipe.types';
import RecipeRegisterForm, { RecipeForm } from './recipe-register-form';
import Dialog from '../dialog/dialog';
import { Button } from '../button';
import EditingContext from '../../contexts/editing-context';
import CurrentRecipeContext from '../../contexts/current-recipe';
import { StorageService } from '../../storage';

interface Props {
  recipeData: RecipeData;
  setCurrentRecipeData(data: RecipeData): void;
}

const RecipeRegister: FC<Props> = ({
  recipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  const { addRecipe } = useContext(RecipesContext);
  const { restoreLastRecipe, currentRecipeData } =
    useContext(CurrentRecipeContext);
  const [openedEmptyRecipe, setOpenedEmptyRecipe] = React.useState(false);
  const { setEditing } = useContext(EditingContext);

  const handleCloseEmptyAlert = useCallback(() => {
    setOpenedEmptyRecipe(false);
  }, []);

  const handleCancel = useCallback(() => {
    StorageService.removeCurrentRecipe();

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
      if (!addRecipe) return;

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
        lastUpdate: Date.now() + Math.random() * 10000000000000,
      };

      const id = addRecipe(newRecipeData);

      setCurrentRecipeData({
        ...newRecipeData,
        id,
      });
    },
    [recipeData?.id, addRecipe, setCurrentRecipeData],
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
      <Dialog
        open={openedEmptyRecipe}
        title="erro ao cadastrar uma nova receita"
        actions={
          <>
            <Button variant="secondary" onClick={handleCancel}>
              cancelar
            </Button>
            <Button onClick={handleCloseEmptyAlert} autoFocus>
              continuar
            </Button>
          </>
        }
      >
        A receita precisa ter um nome. Deseja cancelar o cadastro ou preencher o
        nome e continuar?
      </Dialog>
    </>
  );
};

export default RecipeRegister;
