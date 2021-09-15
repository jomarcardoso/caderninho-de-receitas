import React, { FC, useContext, useState, useCallback } from 'react';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form, FieldArray, ArrayHelpers, FormikProps } from 'formik';
import Button from '../button/button';
import { RecipeData, RECIPE_DATA } from '../../services/recipe';
import SubmitComponent from '../submit';
import AccountContext from '../../contexts/account-context';
import PortionService from '../../services/portion/portion.service';
import FoodsContext from '../../contexts/foods-context';
import ResumedPortion from '../resumed-portion';
import InputIngredient from '../input-ingredient/input-ingredient';
import InputFilled from '../input-filled/input-filled';
import {
  RecipeCategory,
  recipeCategoryList,
  RecipePart,
  RecipePartData,
  RECIPE_PART_DATA,
} from '../../services/recipe/recipe.types';
import SelectFilled from '../select-filled/select-filled';

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

const RECIPE_PART_DATA_MINIMUM: RecipePartData = {
  ...RECIPE_PART_DATA,
  portions: [''],
};

const RecipeRegister: FC<Props> = ({
  recipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  const classes = useStyles();
  const { setAccount } = useContext(AccountContext);
  const foods = useContext(FoodsContext);
  const { parts = [RECIPE_PART_DATA_MINIMUM] } = recipeData;

  const initialFullParts: Array<RecipePart> = parts.map(
    ({ portions = [''], name = '', preparation = '' }) => {
      const initialFullPortions = portions.map((portionToProcess) => {
        return PortionService.portionFromString({
          text: portionToProcess,
          foods,
        });
      }) ?? [''];

      return {
        name,
        portions: initialFullPortions,
        preparation,
      };
    },
  );

  const [fullParts, setFullParts] = useState(initialFullParts);

  // if (!parts.length) {
  //   parts = [RECIPE_PART_DATA_MINIMUM];
  // }

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

  const memoizedRender = useCallback(
    ({
      values,
      handleBlur: formikHandleBlur,
      handleChange,
    }: FormikProps<RecipeForm>) => {
      function handleBlur(
        { target: { value = '' } },
        partIndex = 0,
        index = 0,
      ) {
        const portion = PortionService.portionFromString({
          text: value,
          foods,
        });

        const copyFullParts = [...fullParts.map((a) => ({ ...a }))];

        copyFullParts[partIndex].portions[index] = portion;

        setFullParts(copyFullParts);
      }

      console.log(values.parts);

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
                    multiline
                    name="category"
                    label="Categoria"
                    value={values.category || ''}
                    onChange={handleChange}
                    onBlur={formikHandleBlur}
                  >
                    {recipeCategoryList.map(memoizedRenderCategoryItem)}
                  </SelectFilled>
                </Grid>
                {values.parts.map((part, partIndex) => (
                  <>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        {part.portions.map((value, index) => (
                          <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="stretch">
                              <Grid item xs={2}>
                                <ResumedPortion
                                  portion={fullParts[partIndex].portions[index]}
                                  hideBadge
                                  padding={6}
                                />
                              </Grid>
                              <Grid item xs={10}>
                                <FormControl
                                  variant="standard"
                                  className={classes.formControl}
                                >
                                  <InputIngredient
                                    index={index}
                                    onChange={handleChange}
                                    remove={remove}
                                    value={value}
                                    onBlur={(event) => {
                                      formikHandleBlur(event);
                                      handleBlur(event, partIndex, index);
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl
                        variant="standard"
                        className={classes.formControl}
                      >
                        <InputFilled
                          multiline
                          name="preparation"
                          label="Modo de preparo"
                          value={part.preparation}
                          onChange={handleChange}
                          onBlur={formikHandleBlur}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        onClick={() => push(RECIPE_PART_DATA_MINIMUM)}
                      >
                        Adicionar
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
    [classes.formControl, foods, fullParts, memoizedRenderCategoryItem],
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
