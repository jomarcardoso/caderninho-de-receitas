import React, { FC } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'gatsby';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import Card from './card/card';
import { Meal } from '../services/meal';
import ResumedPortion from './resumed-portion';
import { light, borderSecondary } from './layout/layout';

const useStyles = makeStyles({
  cardLink: {
    display: 'flex',
    flex: 1,
  },
  card: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    ...borderSecondary,
  },
  cardBody: {
    flex: 1,
    backgroundColor: light,
  },
});

interface Props {
  meal: Meal;
}

const MealCard: FC<Props> = ({ meal }) => {
  const classes = useStyles();

  const mainIngredients = meal.portions
    .sort(
      (portionBefore, portionCurrent) =>
        portionCurrent.quantity - portionBefore.quantity,
    )
    .slice(0, 3);

  return (
    <Link to={`/meal#${meal.id}`} state={{ meal }} className={classes.cardLink}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={meal.image} variant="rounded" />
          }
          color="textSecondary"
          title={<Typography variant="h3">{meal.name}</Typography>}
        />
        <Box bgcolor="grey.300" className={classes.cardBody}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  {mainIngredients.map((portion) => (
                    <ResumedPortion
                      portion={portion}
                      key={portion.food.id}
                      xs={4}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
        <CardContent>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item xs={12}>
              <Typography variant="h4">Calorias: {meal.calories}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MealCard;
