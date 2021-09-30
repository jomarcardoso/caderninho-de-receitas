import React, {
  FC,
  useContext,
  useCallback,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form, FieldArray, FormikProps } from 'formik';
import { RecipeData, RECIPE_DATA } from '../../services/recipe';
import SubmitComponent from '../submit';
import AccountContext from '../../contexts/account-context';
import InputFilled from '../input-filled/input-filled';
import {
  RecipeCategory,
  recipeCategoryList,
  RecipeStepData,
  RECIPE_STEP_DATA,
} from '../../services/recipe/recipe.types';
import SelectFilled from '../select-filled/select-filled';
import TextArea from '../text-area/text-area';
import SectionTitle from '../section-title/section-title';
import StepsInput from '../steps-input/steps-input';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
});

interface Props {
  recipeData: RecipeData;
  setCurrentRecipeData(data: RecipeData): void;
}

interface RecipeForm {
  steps: RecipeData['steps'];
  name: string;
  description: string;
  category: RecipeCategory | '';
  quantitySteps: number;
}

const RecipeRegister: FC<Props> = ({
  recipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  const classes = useStyles();
  const { setAccount } = useContext(AccountContext);

  const memoizedHandleSubmit = useCallback(
    ({
      name = '',
      description = '',
      steps: stepsData = [],
      category = '',
    }: RecipeForm): void => {
      if (!setAccount) return;

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

  const memoizedRenderCategoryItem = useCallback(
    (category: RecipeCategory) => (
      <MenuItem value={category}>{category}</MenuItem>
    ),
    [],
  );

  const memoizedRenderInputIngredient = useCallback(
    (
      index = 0,
      setFieldValue: FormikProps<RecipeForm>['setFieldValue'],
      ingredients = '',
      onBlur: FocusEventHandler<HTMLTextAreaElement>,
    ) => {
      const ingredientList = ingredients.split('\n');
      const value = `• ${ingredientList.join('\n• ')}`;

      const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const valueBackSpace = event.target.value.replace(/\n•(?! )/g, '');
        const valueClean = valueBackSpace.replace(/• /g, '');
        const valueCompletelyClean = valueClean.replace(/•/g, '');

        setFieldValue(`steps.${index}.ingredients`, valueCompletelyClean);
      };

      return (
        <TextArea
          name={`steps.${index}.ingredient`}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
        />
      );
    },
    [],
  );

  const memoizedRenderSteps = useCallback(
    (
      quantitySteps = 1,
      valueSteps: RecipeStepData[],
      setFieldValue,
      formikHandleBlur,
      handleChange,
    ) => {
      const steps: RecipeStepData[] = [];

      for (let i = 0; i < Number(quantitySteps); i += 1) {
        steps.push({
          ...RECIPE_STEP_DATA,
          ...valueSteps,
        });
      }

      return (
        <>
          {steps.map((step, index) => (
            <>
              <Grid item xs={12}>
                <FormControl variant="standard" className={classes.formControl}>
                  <InputFilled
                    name={`steps.${index}.name`}
                    value={step.name}
                    onChange={handleChange}
                    onBlur={formikHandleBlur}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <SectionTitle>Ingredientes</SectionTitle>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" className={classes.formControl}>
                  {memoizedRenderInputIngredient(
                    index,
                    setFieldValue,
                    step.ingredients,
                    formikHandleBlur,
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <SectionTitle>Modo de preparo</SectionTitle>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" className={classes.formControl}>
                  <TextArea
                    name={`steps.${index}.preparation`}
                    value={step.preparation}
                    onChange={handleChange}
                    onBlur={formikHandleBlur}
                  />
                </FormControl>
              </Grid>
            </>
          ))}
        </>
      );
    },
    [classes.formControl, memoizedRenderInputIngredient],
  );

  const memoizedRender = useCallback(
    ({
      values,
      handleBlur: formikHandleBlur,
      handleChange,
      setFieldValue,
    }: FormikProps<RecipeForm>) => {
      return (
        <Form action="/" method="post">
          <FieldArray name="steps">
            {() => (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl
                    variant="standard"
                    className={classes.formControl}
                  >
                    <InputFilled
                      name="name"
                      placeholder="Receita"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={formikHandleBlur}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    variant="standard"
                    className={classes.formControl}
                  >
                    <TextArea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={formikHandleBlur}
                      minRows={2}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <SelectFilled
                    name="category"
                    label="Categoria"
                    value={values.category || ''}
                    onChange={handleChange}
                    onBlur={formikHandleBlur}
                  >
                    {recipeCategoryList.map(memoizedRenderCategoryItem)}
                  </SelectFilled>
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
                {memoizedRenderSteps(
                  values.quantitySteps,
                  values.steps,
                  setFieldValue,
                  formikHandleBlur,
                  handleChange,
                )}
                <Grid item xs={12}>
                  <SubmitComponent>Cadastrar refeição</SubmitComponent>
                </Grid>
              </Grid>
            )}
          </FieldArray>
        </Form>
      );
    },
    [classes.formControl, memoizedRenderCategoryItem, memoizedRenderSteps],
  );

  return (
    <Formik
      initialValues={{
        name: recipeData.name,
        description: recipeData.description,
        category: recipeData.category,
        steps: recipeData.steps.length ? recipeData.steps : [RECIPE_STEP_DATA],
        quantitySteps: recipeData.steps.length || 1,
      }}
      onSubmit={memoizedHandleSubmit}
      render={memoizedRender}
    />
  );
};

export default RecipeRegister;
