import React, { FC, useContext, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import { Formik, Form, FieldArray, ArrayHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import Button from './button/button';
import { Meal, MealData, MEAL, MEAL_DATA } from '../services/meal';
import SubmitComponent from './submit';
import AccountContext from '../contexts/account-context';
import PortionService from '../services/portion/portion.service';
import FoodsContext from '../contexts/foods-context';
import ResumedPortion from './resumed-portion';
import InputIngredient from './input-ingredient/input-ingredient';
import InputFilled from './input-filled/input-filled';

const useStyles = makeStyles({
  formControl: {
    display: 'flex',
  },
});

interface Props {
  mealData: MealData;
  meal: Meal;
  setId: (id: number) => void;
  editing: boolean;
  setEditing(editing: boolean): void;
}

interface MealForm {
  portions: Array<string>;
  name: string;
  description: string;
  preparation: string;
}

const MealRegister: FC<Props> = ({
  mealData = MEAL_DATA,
  meal = MEAL,
  setId,
  editing = true,
  setEditing,
}) => {
  const classes = useStyles();
  const { setAccount } = useContext(AccountContext);
  const foods = useContext(FoodsContext);
  let { portions = [''] } = mealData;

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

  function handleBlur({ target: { value = '' } }, index = 0) {
    const portion = PortionService.portionFromString({
      text: value,
      foods,
    });

    const copyFullPortions = [...fullPortions];

    copyFullPortions[index] = portion;

    setFullPortions(copyFullPortions);
  }

  function handleSubmit({
    name = '',
    description = '',
    preparation = '',
    portions: portionsData = [],
  }: MealForm): void {
    if (!setAccount) return;

    const id = setAccount.meal({
      portions: portionsData,
      name,
      description,
      id: mealData?.id ?? 0,
      preparation,
    });

    setId(id);
    setEditing(false);
  }

  return (
    <Formik
      initialValues={{
        portions,
        name: mealData.name,
        description: mealData.description,
        preparation: mealData.preparation,
      }}
      onSubmit={handleSubmit}
      render={({ values, handleBlur: formikHandleBlur, handleChange }) => (
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
                {(editing || meal.description) && (
                  <Grid item xs={12}>
                    {editing ? (
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
                    ) : (
                      <Typography>{meal.description}</Typography>
                    )}
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Grid container spacing={editing ? 3 : 1}>
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
                                  handleBlur(event);
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
      )}
    />
  );
};

export default MealRegister;
