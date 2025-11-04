'use client';

import { type FC, useCallback, useState, useEffect, useContext } from 'react';
import { Formik, type FormikProps } from 'formik';
import {
  RecipeRegisterForm,
  RECIPE_STEP_DTO_WITH_KEY_ID,
  type RecipeForm,
} from './recipe-register-form';
import { Button } from 'notebook-layout';
import type { RecipeDto } from 'services/recipe/recipe.dto';
import { translate } from 'services/language/language.service';
import { generateId } from 'services/string.service';
import Dialog from '../dialog/dialog';
import { Language } from '@/contexts/language';
import { NavigationService } from '@/services/navigation.service';
import { DataContext } from '@/providers/data';

interface Props {
  recipeToEdit?: RecipeDto;
}

export const RecipeRegister: FC<Props> = ({ recipeToEdit }) => {
  const [recipe, setRecipe] = useState(recipeToEdit);
  const [openedEmptyRecipe, setOpenedEmptyRecipe] = useState(false);
  const language: Language = 'pt';
  const { saveRecipe } = useContext(DataContext);

  const handleCloseEmptyAlert = useCallback(() => {
    setOpenedEmptyRecipe(false);
  }, []);

  const handleCancel = useCallback(() => {
    NavigationService.pop();
  }, []);

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
        (recipe?.id || 0) > 0
          ? updatedData.recipes.find((item) => item.id === newRecipe.id)
          : undefined;

      if (!savedRecipe) {
        savedRecipe = updatedData.recipes.reduce(
          (latest, item) => ((item.id ?? 0) > (latest.id ?? 0) ? item : latest),
          updatedData.recipes[0],
        );
      }
    },
    [language, recipe?.id, saveRecipe],
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
