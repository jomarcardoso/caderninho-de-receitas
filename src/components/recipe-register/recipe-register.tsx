import React, { FC, useContext, useCallback } from 'react';
import { Formik, FormikProps } from 'formik';
import { Recipe, RECIPE } from '../../services/recipe';
import RecipesContext from '../../contexts/recipes-context';
import { RECIPE_STEP } from '../../services/recipe/recipe.types';
import RecipeRegisterForm, { RecipeForm } from './recipe-register-form';
import Dialog from '../dialog/dialog';
import { Button } from '../button';
import EditingContext from '../../contexts/editing-context';
import CurrentRecipeContext from '../../contexts/current-recipe';
import { StorageService } from '../../storage';

interface Props {
  recipe: Recipe;
  setCurrentRecipe(data: Recipe): void;
}

const RecipeRegister: FC<Props> = ({ recipe = RECIPE, setCurrentRecipe }) => {
  const { addRecipe } = useContext(RecipesContext);
  const { restoreLastRecipe, currentRecipe } = useContext(CurrentRecipeContext);
  const [openedEmptyRecipe, setOpenedEmptyRecipe] = React.useState(false);
  const { setEditing } = useContext(EditingContext);

  const handleCloseEmptyAlert = useCallback(() => {
    setOpenedEmptyRecipe(false);
  }, []);

  const handleCancel = useCallback(() => {
    StorageService.removeCurrentRecipe();

    if (!currentRecipe.id) {
      if (restoreLastRecipe) restoreLastRecipe();
    }

    if (setEditing) setEditing(false);
  }, [currentRecipe.id, restoreLastRecipe, setEditing]);

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

      const newRecipe: Recipe = {
        steps: stepsData,
        name,
        description,
        id: recipe?.id ?? 0,
        category,
        lastUpdate: Date.now() + Math.random() * 10000000000000,
        needSync: true,
      };

      const id = addRecipe(newRecipe);

      setCurrentRecipe({
        ...newRecipe,
        id,
      });
    },
    [recipe?.id, addRecipe, setCurrentRecipe],
  );

  return (
    <>
      <Formik
        initialValues={{
          name: recipe?.name ?? '',
          description: recipe?.description ?? '',
          additional: recipe?.additional ?? '',
          category: recipe?.category ?? '',
          steps: recipe?.steps?.length ? recipe.steps : [RECIPE_STEP],
          quantitySteps: recipe?.steps?.length || 1,
        }}
        onSubmit={memoizedHandleSubmit}
      >
        {(formik: FormikProps<RecipeForm>) => (
          <RecipeRegisterForm
            recipe={recipe}
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
