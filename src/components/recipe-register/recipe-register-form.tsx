import { Form, FieldArray, FormikProps } from 'formik';
import React, { FC, useCallback, ChangeEventHandler, Fragment } from 'react';
import { IoDuplicateOutline, IoSaveOutline } from 'react-icons/io5';
import Grid from '@mui/material/Grid';
import Field from '../field/field';
import {
  RecipeCategory,
  RecipeStepData,
  RECIPE_STEP_DATA,
  RecipeData,
} from '../../services/recipe/recipe.types';
import SubmitComponent from '../submit';
import './recipe-register.scss';
import { Button } from '../button';
import CookSvg from '../../assets/svg/history/cook.svg';
import PizzaSvg from '../../assets/svg/history/pizza.svg';

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
  onCancel: () => void;
}

const RecipeRegisterForm: FC<FormikProps<RecipeForm> & Props> = ({
  values,
  onCancel,
  handleBlur: formikHandleBlur,
  handleChange,
  setFieldValue,
  recipeData,
}) => {
  const memoizedRenderInputIngredient = useCallback(
    (index = 0, ingredients = '', stepName = '') => {
      const ingredientList = ingredients.split('\n');
      const value = `• ${ingredientList.join('\n• ')}`;
      const label = `Ingredientes${stepName ? ` - ${stepName}` : ''}`;

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
          label={label}
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
                hint={
                  <details>
                    <summary>
                      massa, cobertura, etc. <u>Saber mais.</u>
                    </summary>
                    Você não precisa preencher esse campo se a sua receita não
                    possui mais do que uma etapa ou camada. Por exemplo uma
                    salada pode ser feita com todos os ingredientes juntos e em
                    um único processo, porém um bolo pode ter várias partes, a
                    massa, o recheio e a cobertura, então é necessário
                    diferenciar cada uma delas.
                  </details>
                }
              />
            </Grid>
            <Grid item xs={12}>
              {memoizedRenderInputIngredient(
                index,
                step.ingredients,
                step.name,
              )}
            </Grid>
            <Grid item xs={12}>
              <Field
                multiline
                minRows="4"
                label={`Modo de preparo${step.name ? ` - ${step.name}` : ''}`}
                name={`steps.${index}.preparation`}
                value={step.preparation}
                onChange={handleChange}
                onBlur={formikHandleBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                multiline
                name={`steps.${index}.additional`}
                label={`Informações adicionais${
                  step.name ? ` - ${step.name}` : ''
                }`}
                value={step.additional}
                onChange={handleChange}
                onBlur={formikHandleBlur}
                minRows={2}
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
      <div className="recipe-register__body">
        <div className="recipe-register__wrapper">
          <FieldArray name="steps">
            {() => (
              <>
                {recipeData.id ? (
                  <div className="recipe-register__story-image">
                    <CookSvg style={{ mixBlendMode: 'multiply' }} />
                  </div>
                ) : (
                  <div className="container">
                    <PizzaSvg style={{ mixBlendMode: 'multiply' }} />
                  </div>
                )}
                <div className="container">
                  <Grid container spacing={6}>
                    <Grid item xs={12}>
                      {!recipeData.id ? (
                        <p>
                          Você está criando uma nova receita. Preencha os campos
                          abaixo e pressione o botão salvar receita para criá-la
                          e adicioná-la ao seu caderninho de receitas.
                        </p>
                      ) : (
                        <p>
                          Você está editando uma receita já existente. Preencha
                          os campos abaixo e pressione o botão salvar receita
                          para atualizá-la.
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
                        minRows={2}
                      />
                    </Grid>
                    {memoizedRenderSteps()}
                    <Grid item xs={12}>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <Button
                          type="button"
                          variant="secondary"
                          contrast="light"
                          onClick={() =>
                            setFieldValue(
                              'quantitySteps',
                              values.quantitySteps + 1,
                            )
                          }
                        >
                          <IoDuplicateOutline />
                          adicionar outra etapa
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </>
            )}
          </FieldArray>
        </div>
      </div>
      <div className="recipe-register__submit">
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Button fullWidth variant="secondary" onClick={onCancel}>
              cancelar
            </Button>
          </Grid>
          <Grid item xs={8}>
            <SubmitComponent>
              <IoSaveOutline />
              salvar receita
            </SubmitComponent>
          </Grid>
        </Grid>
      </div>
    </Form>
  );
};

export default RecipeRegisterForm;
