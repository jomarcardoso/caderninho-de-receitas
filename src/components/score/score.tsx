import React, { FC, ReactElement } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid, { GridProps } from '@mui/material/Grid';
import Card from '../card/card';
import { Recipe } from '../../services/recipe';

interface Props {
  recipe: Recipe;
}

interface RenderResultArgs {
  name: string;
  value: number | string;
}

type RenderResult = (ags: RenderResultArgs) => ReactElement;

export type ScoreProps = Props & GridProps;

const ScoreComponent: FC<ScoreProps> = ({ recipe, ...props }) => {
  const renderResult: RenderResult = ({ name = '', value = '' }) => {
    return (
      <Grid item xs={6} sm={4} className="score" {...props}>
        <Card className="score__card">
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
