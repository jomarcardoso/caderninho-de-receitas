'use client';
import { CiCircleChevLeft, CiFloppyDisk } from 'react-icons/ci';
import { Navbar } from '@/components/navbar/navbar';
import { Layout2 } from '@/components/layout-2/layout-2';
import { translate } from '@common/services/language/language.service';
import { Button } from 'notebook-layout';
import { Header2 } from '@/components/header-2/header-2';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RecipeDto } from '@common/services/recipe';
import { DataContext } from '@/providers/data';
import { LanguageContext } from '@/contexts/language';
import {
  RECIPE_STEP_DTO_WITH_KEY_ID,
  RecipeForm,
  RecipeRegister,
} from '@/components/recipe-register/recipe-register-form';
import { Form, Formik, FormikProps } from 'formik';
import { generateId } from '@common/services/string.service';
import { Dialog } from 'notebook-layout';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { NavLink } from '@/components/nav-link/nav-link';

interface KitchenPageViewProps {
  recipeToEdit?: RecipeDto;
}

export const KitchenPageView: FC<KitchenPageViewProps> = ({ recipeToEdit }) => {
  const [recipe, setRecipe] = useState(recipeToEdit);
  const { saveRecipe } = useContext(DataContext);
  const [openedEmptyRecipe, setOpenedEmptyRecipe] = useState(false);
  const { language } = useContext(LanguageContext);
  const { pop } = useAppNavigation();
  const router = useRouter();

  const handleCloseEmptyAlert = useCallback(() => {
    setOpenedEmptyRecipe(false);
  }, []);

  const handleCancel = useCallback(() => {
    pop();
  }, [pop]);

  const memoizedHandleSubmit = useCallback(
    async ({
      name = '',
      description = '',
      additional = '',
      imgs = [],
      steps: stepsData = [],
      categories = [],
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
        categories,
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
        // Revalidate cache tag for this recipe and navigate to its page
        try {
          await fetch('/api/revalidate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tags: [`recipe/${savedRecipe.id}`] }),
          });
        } catch (e) {
          console.warn('Failed to revalidate tag', e);
        }
        router.push(`/recipe/${savedRecipe.id}`);
      }
    },
    [language, recipe?.id, saveRecipe, router],
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
          categories: recipe?.categories ?? [],
          // category: recipe?.category ?? '',
          steps: recipe?.steps?.length
            ? recipe.steps.map((s) => ({ keyId: generateId(), ...s }))
            : [RECIPE_STEP_DTO_WITH_KEY_ID],
          // quantitySteps: recipe?.steps?.length || 1,
        }}
        enableReinitialize
        onSubmit={memoizedHandleSubmit}
      >
        {(formik: FormikProps<RecipeForm>) => (
          <Form action="/" method="post">
            <Layout2
              header={<Header2 />}
              navbar={
                <Navbar>
                  <NavLink action="pop" className="button button--secondary">
                    <CiCircleChevLeft />
                    {translate('cancel', language)}
                  </NavLink>
                  <Button
                    type="submit"
                    // disabled={!serverUp}
                    // title={!serverUp ? 'Servidor offline' : undefined}
                  >
                    <CiFloppyDisk />
                    {translate('saveRecipe', language)}
                  </Button>
                </Navbar>
              }
            >
              <main className="theme-light py-5">
                <RecipeRegister
                  recipe={recipe}
                  onCancel={handleCancel}
                  {...formik}
                />
              </main>
            </Layout2>
          </Form>
        )}
      </Formik>

      <Dialog
        open={openedEmptyRecipe}
        title={translate('recipeDialogErrorTitle', language)}
        actions={
          <>
            <Button variant="secondary" onClick={() => handleCancel()}>
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
