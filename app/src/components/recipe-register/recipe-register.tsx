import { type FC, useContext, useCallback, useState, useEffect } from 'react';
import { Formik, type FormikProps } from 'formik';
import { DataContext } from '../../providers/data/data.context';
import RecipeRegisterForm, {
  RECIPE_STEP_DTO_WITH_KEY_ID,
  type RecipeForm,
} from './recipe-register-form';
import Dialog from '../dialog/dialog';
import { Button } from 'notebook-layout';
import { EditingContext } from '../../providers/editing/editing.context';
import CurrentRecipeContext from '../../providers/current-recipe/current-recipe.context';
import type { RecipeDto } from 'services/recipe/recipe.dto';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import { generateId } from 'services/string.service';

interface Props {
  recipeToEdit?: RecipeDto;
}

const RecipeRegister: FC<Props> = ({ recipeToEdit }) => {
  const [recipe, setRecipe] = useState(recipeToEdit);
  const { saveRecipe } = useContext(DataContext);
  const { restoreLastRecipe, currentRecipeId, setCurrentRecipeId } =
    useContext(CurrentRecipeContext);
  const [openedEmptyRecipe, setOpenedEmptyRecipe] = useState(false);
  const { setEditing } = useContext(EditingContext);
  const { language } = useContext(LanguageContext);

  const handleCloseEmptyAlert = useCallback(() => {
    setOpenedEmptyRecipe(false);
  }, []);

  const handleCancel = useCallback(() => {
    if (!currentRecipeId) {
      restoreLastRecipe?.();
    }

    if (setEditing) setEditing(false);
  }, [currentRecipeId, restoreLastRecipe, setEditing]);

  const memoizedHandleSubmit = useCallback(
    async ({
      name = '',
      description = '',
      additional = '',
      imgs = [],
      steps: stepsData = [],
    }: // category = '',
    RecipeForm): Promise<void> => {
      if (!saveRecipe) return;

      if (!name) {
        setOpenedEmptyRecipe(true);

        return;
      }

      const newRecipe: RecipeDto = {
        steps: stepsData,
        name,
        description,
        additional,
        imgs,
        language,
        id: recipe?.id ?? 0,
        // category,
      };

      const updatedData = await saveRecipe(newRecipe);

      if (!updatedData?.recipes.length) {
        return;
      }

      let savedRecipe =
        newRecipe.id > 0
          ? updatedData.recipes.find((item) => item.id === newRecipe.id)
          : undefined;

      if (!savedRecipe) {
        savedRecipe = updatedData.recipes.reduce(
          (latest, item) => (item.id > latest.id ? item : latest),
          updatedData.recipes[0],
        );
      }

      if (savedRecipe) {
        setCurrentRecipeId?.(savedRecipe.id);
        setEditing?.(false);
      }
    },
    [language, recipe?.id, saveRecipe, setCurrentRecipeId, setEditing],
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
          imgs: recipe?.imgs ?? [],
          // category: recipe?.category ?? '',
          steps: recipe?.steps?.length
            ? recipe.steps.map((s) => ({ keyId: generateId(), ...s }))
            : [RECIPE_STEP_DTO_WITH_KEY_ID],
          // quantitySteps: recipe?.steps?.length || 1,
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

