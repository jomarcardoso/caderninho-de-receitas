import { Form, FieldArray, FormikProps } from 'formik';
import React, { FC, useCallback, ChangeEventHandler } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import StepsInput from '../steps-input/steps-input';
import Field from '../field/field';
import {
  RecipeCategory,
  RecipeStepData,
  RECIPE_STEP_DATA,
  RecipeData,
} from '../../services/recipe/recipe.types';
import SubmitComponent from '../submit';

export interface RecipeForm {
  steps: RecipeData['steps'];
  name: string;
  description: string;
  category: RecipeCategory | '';
  quantitySteps: number;
}

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
  submit: {
    position: 'sticky',
    bottom: 44,
  },
});

const RecipeRegisterForm: FC<FormikProps<RecipeForm>> = ({
  values,
  handleBlur: formikHandleBlur,
  handleChange,
  setFieldValue,
}) => {
  const classes = useStyles();

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
                label={`Parte ${index + 1} nome`}
                name={`steps.${index}.name`}
                value={step.name}
                onChange={handleChange}
                onBlur={formikHandleBlur}
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
            <Field
              label="Receita"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={formikHandleBlur}
            />
            <Grid container spacing={3}>
              <Grid item xs={12} />
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
                <StepsInput
                  inputProps={{
                    name: 'quantitySteps',
                    value: values.quantitySteps,
                    onChange: handleChange,
                    onBlur: formikHandleBlur,
                  }}
                />
              </Grid>
              {memoizedRenderSteps()}
              <Grid item xs={12} className={classes.submit}>
                <SubmitComponent>Cadastrar refeição</SubmitComponent>
              </Grid>
            </Grid>
          </Container>
        )}
      </FieldArray>
    </Form>
  );
};

export default RecipeRegisterForm;
