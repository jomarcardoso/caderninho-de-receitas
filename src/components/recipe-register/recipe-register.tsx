import React, { FC, useContext, useState, useCallback } from 'react';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
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
  portions: Array<string>;
  name: string;
  description: string;
  preparation: string;
}

const RecipeRegister: FC<Props> = ({
  recipeData = RECIPE_DATA,
  setCurrentRecipeData,
}) => {
  const classes = useStyles();
  const { setAccount } = useContext(AccountContext);
  const foods = useContext(FoodsContext);
  let { portions = [''] } = recipeData;

  const initialFullPortions =
    portions.map((portionToProcess) => {
      return PortionService.portionFromString({
        text: portionToProcess,
        foods,
      });
    }) ?? [];

  const [fullPortions, setFullPortions] = useState(initialFullPortions);

  if (!portions.length) {
    portions = [''];
  }

  const memoizedHandleSubmit = useCallback(
    ({
      name = '',
      description = '',
      preparation = '',
      portions: portionsData = [],
    }: RecipeForm): void => {
      if (!setAccount) return;

      const newRecipeData: RecipeData = {
        portions: portionsData,
        name,
        description,
        id: recipeData?.id ?? 0,
        preparation,
      };

      const id = setAccount.recipe(newRecipeData);

      setCurrentRecipeData({
        ...newRecipeData,
        id,
      });
    },
    [recipeData?.id, setAccount, setCurrentRecipeData],
  );

  const memoizedRender = useCallback(
    ({
      values,
      handleBlur: formikHandleBlur,
      handleChange,
    }: FormikProps<RecipeForm>) => {
      function handleBlur({ target: { value = '' } }, index = 0) {
        const portion = PortionService.portionFromString({
          text: value,
          foods,
        });

        const copyFullPortions = [...fullPortions];

        copyFullPortions[index] = portion;

        setFullPortions(copyFullPortions);
      }

      return (
        <Form action="/" method="post">
          <FieldArray name="portions">
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
                  <Grid container spacing={3}>
                    {values.portions.map((value, index) => (
                      <Grid item xs={12}>
                        <Grid container spacing={1} alignItems="stretch">
                          <Grid item xs={2}>
                            <ResumedPortion
                              portion={fullPortions[index]}
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
                                  handleBlur(event, index);
                                }}
                              />
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button variant="outlined" onClick={() => push('')}>
                        Adicionar
                      </Button>
                    </Grid>
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
                      value={values.preparation}
                      onChange={handleChange}
                      onBlur={formikHandleBlur}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <SubmitComponent>Cadastrar refeição</SubmitComponent>
                </Grid>
              </Grid>
            )}
          </FieldArray>
        </Form>
      );
    },
    [classes.formControl, foods, fullPortions],
  );

  return (
    <Formik
      initialValues={{
        portions,
        name: recipeData.name,
        description: recipeData.description,
        preparation: recipeData.preparation,
      }}
      onSubmit={memoizedHandleSubmit}
      render={memoizedRender}
    />
  );
};

export default RecipeRegister;
