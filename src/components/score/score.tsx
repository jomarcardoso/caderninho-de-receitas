import React, { FC, ReactElement } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '../card/card';
import { Recipe } from '../../services/recipe';

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
  recipe: Recipe;
}

interface RenderResultArgs {
  name: string;
  value: number | string;
}

type RenderResult = (ags: RenderResultArgs) => ReactElement;

const ScoreComponent: FC<Props> = ({ recipe }) => {
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
        value: recipe.calories,
      })}
      {renderResult({
        name: 'Acidificação',
        value: recipe.gi,
      })}
      {renderResult({
        name: 'Índice Glicêmico',
        value: recipe.gi,
      })}
      {renderResult({
        name: 'Carga Glicêmica',
        value: recipe.gl,
      })}
    </Grid>
  );
};

export default ScoreComponent;
