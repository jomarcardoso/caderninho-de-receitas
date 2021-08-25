import React, { FC, ReactElement } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from './card/card';
import { Meal } from '../services/meal';

const useStyles = makeStyles({
  result: {
    display: 'flex',
    flex: 1,
  },
  card: {
    flex: 1,
  },
});

interface Props {
  meal: Meal;
}

interface RenderResultArgs {
  name: string;
  value: number | string;
}

type RenderResult = (ags: RenderResultArgs) => ReactElement;

const ScoreComponent: FC<Props> = ({ meal }) => {
  const classes = useStyles();

  const renderResult: RenderResult = ({ name = '', value = '' }) => {
    return (
      <Grid item xs={6} sm={4} className={classes.result}>
        <Card className={classes.card}>
          <CardContent>
            <Typography component="p" variant="h3" align="center">
              {Math.round(Number(value))}
            </Typography>
            <Typography component="h3" variant="h4" align="center">
              {name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Grid container spacing={2}>
      {renderResult({
        name: 'Calorias Totais',
        value: meal.calories,
      })}
      {renderResult({
        name: 'Índice Glicêmico',
        value: meal.gi,
      })}
      {renderResult({
        name: 'Acidificação',
        value: meal.gi,
      })}
    </Grid>
  );
};

export default ScoreComponent;
