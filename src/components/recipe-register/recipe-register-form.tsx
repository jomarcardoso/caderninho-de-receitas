import { Form, FieldArray, FormikProps } from 'formik';
import React, { FC, useCallback, ChangeEventHandler } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Field from '../field/field';
import {
  RecipeCategory,
  RecipeStepData,
  RECIPE_STEP_DATA,
  RecipeData,
} from '../../services/recipe/recipe.types';
import SubmitComponent from '../submit';
import './recipe-register.scss';
import Button from '../button/button';

export interface RecipeForm {
  steps: RecipeData['steps'];
  name: string;
  description: string;
  category: RecipeCategory | '';
  quantitySteps: number;
  additional: string;
}

interface Props {
  recipeData: RecipeData;
}

const RecipeRegisterForm: FC<FormikProps<RecipeForm> & Props> = ({
  values,
  handleBlur: formikHandleBlur,
  handleChange,
  setFieldValue,
  recipeData,
}) => {
  const memoizedRenderInputIngredient = useCallback(
    (index = 0, ingredients = '') => {
      const ingredientList = ingredients.split('\n');
      const value = `• ${ingredientList.join('\n• ')}`;

      const handleChangeIngredient: ChangeEventHandler<HTMLTextAreaElement> = (
        event,
      ) => {
        const valueBackSpace = event.target.value.replace(/\n•(?! )/g, '');
        const valueClean = valueBackSpace.replace(/• /g, '');
        const valueCompletelyClean = valueClean.replace(/•/g, '');

        setFieldValue(`steps.${index}.ingredients`, valueCompletelyClean);
      };

      return (
        <Field
          multiline
          label="ingredientes"
          minRows="4"
          name={`steps.${index}.ingredient`}
          value={value}
          onChange={handleChangeIngredient}
          onBlur={formikHandleBlur}
        />
      );
    },
    [formikHandleBlur, setFieldValue],
  );

  const memoizedRenderSteps = useCallback(() => {
    const steps: RecipeStepData[] = [];

    for (let i = 0; i < Number(values.quantitySteps); i += 1) {
      steps.push({
        ...RECIPE_STEP_DATA,
        ...values.steps[i],
      });
    }

    return (
      <>
        {steps.map((step, index) => (
          <>
            <Grid item xs={12}>
              <Field
                label={`nome da etapa ${index + 1} (opcional)`}
                name={`steps.${index}.name`}
                value={step.name}
                onChange={handleChange}
                onBlur={formikHandleBlur}
                hint="massa, cobertura, etc"
              />
            </Grid>
            <Grid item xs={12}>
              {memoizedRenderInputIngredient(index, step.ingredients)}
            </Grid>
            <Grid item xs={12}>
              <Field
                multiline
                minRows="4"
                label="modo de preparo"
                name={`steps.${index}.preparation`}
                value={step.preparation}
                onChange={handleChange}
                onBlur={formikHandleBlur}
              />
            </Grid>
          </>
        ))}
      </>
    );
  }, [
    formikHandleBlur,
    handleChange,
    memoizedRenderInputIngredient,
    values.quantitySteps,
    values.steps,
  ]);

  return (
    <Form action="/" method="post">
      <FieldArray name="steps">
        {() => (
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {!recipeData.id ? (
                  <p>
                    Você está criando uma nova receita. Preencha os campos
                    abaixo e pressione o botão salvar receita para criá-la e
                    adicioná-la ao seu caderninho de receitas.
                  </p>
                ) : (
                  <p>
                    Você está editando uma receita já existente. Preencha os
                    campos abaixo e pressione o botão salvar receita para
                    atualizá-la.
                  </p>
                )}
              </Grid>
              <Grid item xs={12}>
                <Field
                  label="nome da receita"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={formikHandleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  multiline
                  name="description"
                  label="descrição"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={formikHandleBlur}
                  minRows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  multiline
                  name="additional"
                  label="informações adicionais"
                  value={values.additional}
                  onChange={handleChange}
                  onBlur={formikHandleBlur}
                  minRows={1}
                />
              </Grid>
              {memoizedRenderSteps()}
              <Grid item xs={12}>
                <Button
                  type="button"
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() =>
                    setFieldValue('quantitySteps', values.quantitySteps + 1)
                  }
                >
                  adicionar outra etapa
                </Button>
              </Grid>
              <Grid item xs={12} className="recipe-register__submit">
                <SubmitComponent>salvar receita</SubmitComponent>
              </Grid>
            </Grid>
          </Container>
        )}
      </FieldArray>
    </Form>
  );
};

export default RecipeRegisterForm;
