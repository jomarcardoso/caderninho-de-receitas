import React, { FC, ReactElement } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid, { GridProps } from '@mui/material/Grid';
import Card from '../card/card';
import { Recipe } from '../../services/recipe';
import './score.scss';

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
          <CardContent className="score__content">
            <Typography component="p" className="score__value" align="center">
              {Math.round(Number(value))}
            </Typography>
            <Typography component="p" variant="h4" align="center">
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
        name: 'calorias',
        value: recipe.calories,
      })}
      {renderResult({
        name: 'gorduras',
        value: recipe.totalFat.toFixed(0),
      })}
      {renderResult({
        name: 'carboidratos',
        value: recipe.carbohydrates,
      })}
      {renderResult({
        name: 'fibras',
        value: recipe.dietaryFiber,
      })}
      {renderResult({
        name: 'proteínas',
        value: recipe.proteins,
      })}
    </Grid>
  );
};

export default ScoreComponent;
