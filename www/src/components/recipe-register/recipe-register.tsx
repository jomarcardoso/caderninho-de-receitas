import React, { FC, useContext, useCallback, useState, useEffect } from 'react';
import { Formik, FormikProps } from 'formik';
import { DataContext } from '../../providers/data/data.context';
import RecipeRegisterForm, { RecipeForm } from './recipe-register-form';
import Dialog from '../dialog/dialog';
import { Button } from '../button';
import { EditingContext } from '../../providers/editing/editing.context';
import CurrentRecipeContext from '../../providers/current-recipe/current-recipe.context';
import { StorageService } from '../../storage';
import { RecipeDto } from '../../services/recipe/recipe.dto';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';

interface Props {
  recipeToEdit?: RecipeDto;
}

const RecipeRegister: FC<Props> = ({ recipeToEdit }) => {
  const [recipe, setRecipe] = useState<RecipeDto | undefined>(recipeToEdit);
  const { saveRecipe: addRecipe } = useContext(DataContext);
  const { restoreLastRecipe, currentRecipe, setCurrentRecipe } =
    useContext(CurrentRecipeContext);
  const [openedEmptyRecipe, setOpenedEmptyRecipe] = useState(false);
  const { setEditing } = useContext(EditingContext);
  const { language } = useContext(LanguageContext);

  const handleCloseEmptyAlert = useCallback(() => {
    setOpenedEmptyRecipe(false);
  }, []);

  const handleCancel = useCallback(() => {
    StorageService.removeCurrentRecipe();

    if (!currentRecipe?.id) {
      restoreLastRecipe?.();
    }

    if (setEditing) setEditing(false);
  }, [currentRecipe?.id, restoreLastRecipe, setEditing]);

  const memoizedHandleSubmit = useCallback(
    ({
      name = '',
      description = '',
      steps: stepsData = [],
      // category = '',
    }: RecipeForm): void => {
      if (!addRecipe) return;

      if (!name) {
        setOpenedEmptyRecipe(true);

        return;
      }

      const newRecipe: RecipeDto = {
        steps: stepsData,
        name,
        description,
        id: recipe?.id ?? 0,
        // category,
      };

      // const id = addRecipe(newRecipe);

      setCurrentRecipe?.({
        ...newRecipe,
        // id,
      });
    },
    [recipe?.id, addRecipe, setCurrentRecipe],
  );

  useEffect(() => {
    if (recipeToEdit) {
      setRecipe(recipeToEdit);
    }
  }, [recipeToEdit]);

  return (
    <>
      <Formik
        initialValues={{
          name: recipe?.name ?? '',
          description: recipe?.description ?? '',
          additional: recipe?.additional ?? '',
          // category: recipe?.category ?? '',
          steps: recipe?.steps?.length ? recipe.steps : [{}],
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
        title={translate('recipeDialogErrorTitle', language)}
        actions={
          <>
            <Button variant="secondary" onClick={handleCancel}>
              {translate('cancel', language)}
            </Button>
            <Button onClick={handleCloseEmptyAlert} autoFocus>
              {translate('continue', language)}
            </Button>
          </>
        }
      >
        {translate('recipeDialogErrorMessage', language)}
      </Dialog>
    </>
  );
};

export default RecipeRegister;
