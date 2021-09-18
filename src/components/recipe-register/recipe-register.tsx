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
import { Formik, Form, FieldArray, ArrayHelpers, FormikProps } from 'formik';
import Button from '../button/button';
import { RecipeData, RECIPE_DATA } from '../../services/recipe';
import SubmitComponent from '../submit';
import AccountContext from '../../contexts/account-context';
import InputFilled from '../input-filled/input-filled';
import {
  RecipeCategory,
  recipeCategoryList,
  RECIPE_PART_DATA,
} from '../../services/recipe/recipe.types';
import SelectFilled from '../select-filled/select-filled';
import TextArea from '../text-area/text-area';

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
  parts: RecipeData['parts'];
  name: string;
  description: string;
  category: RecipeCategory | '';
}

const RecipeRegister: FC<Props> = ({
  recipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  const classes = useStyles();
  const { setAccount } = useContext(AccountContext);
  const { parts = [RECIPE_PART_DATA] } = recipeData;

  const memoizedHandleSubmit = useCallback(
    ({
      name = '',
      description = '',
      parts: partsData = [],
      category = '',
    }: RecipeForm): void => {
      if (!setAccount) return;

      const newRecipeData: RecipeData = {
        parts: partsData,
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

  const memoizedRenderInputPortion = useCallback(
    (
      index = 0,
      setFieldValue: FormikProps<RecipeForm>['setFieldValue'],
      portions = '',
      onBlur: FocusEventHandler<HTMLTextAreaElement>,
    ) => {
      const portionList = portions.split('\n');
      const value = `• ${portionList.join('\n• ')}`;

      const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const valueBackSpace = event.target.value.replace(/\n•(?! )/g, '');
        const valueClean = valueBackSpace.replace(/• /g, '');
        const valueCompletelyClean = valueClean.replace(/•/g, '');

        setFieldValue(`parts.${index}.portions`, valueCompletelyClean);
      };

      return (
        <InputFilled
          multiline
          name={`parts.${index}.portions`}
          label="Ingredientes"
          onChange={handleChange}
          value={value}
          onBlur={onBlur}
        />
      );
    },
    [],
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
          <FieldArray name="parts">
            {({ push, remove }: ArrayHelpers) => (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl
                    variant="standard"
                    className={classes.formControl}
                  >
                    <InputFilled
                      name="name"
                      label="Nome da receita"
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
                    <InputFilled
                      multiline
                      name="description"
                      label="Descrição"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={formikHandleBlur}
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
                {values.parts.map((part, index) => (
                  <>
                    <Grid item xs={12}>
                      <FormControl
                        variant="standard"
                        className={classes.formControl}
                      >
                        {memoizedRenderInputPortion(
                          index,
                          setFieldValue,
                          part.portions,
                          formikHandleBlur,
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        variant="standard"
                        className={classes.formControl}
                      >
                        <TextArea
                          name={`parts.${index}.preparation`}
                          value={part.preparation}
                          onChange={handleChange}
                          onBlur={formikHandleBlur}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        onClick={() => push(RECIPE_PART_DATA)}
                      >
                        Adicionar
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button variant="outlined" onClick={() => remove(index)}>
                        Remover
                      </Button>
                    </Grid>
                  </>
                ))}
                <Grid item xs={12}>
                  <SubmitComponent>Cadastrar refeição</SubmitComponent>
                </Grid>
              </Grid>
            )}
          </FieldArray>
        </Form>
      );
    },
    [
      classes.formControl,
      memoizedRenderCategoryItem,
      memoizedRenderInputPortion,
    ],
  );

  return (
    <Formik
      initialValues={{
        name: recipeData.name,
        description: recipeData.description,
        category: recipeData.category,
        parts,
      }}
      onSubmit={memoizedHandleSubmit}
      render={memoizedRender}
    />
  );
};

export default RecipeRegister;
