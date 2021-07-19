import React, { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ResumedPortion from '../resumed-portion';
import { MEAL, Meal } from '../../services/meal';

const useStyles = makeStyles({
  portionsContainer: {
    padding: '30px',
  },
});

interface Props {
  meal: Meal;
}

const PortionsContainer: FC<Props> = ({ meal = MEAL }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Box className={classes.portionsContainer} bgcolor="grey.600">
        <Grid container spacing={2} component="ul" justifyContent="center">
          {meal.portions.map((portion) => (
            <Grid item key={portion.food.id} xs={6} sm={4} md={3} lg={2}>
              <ResumedPortion portion={portion} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};

export default PortionsContainer;
