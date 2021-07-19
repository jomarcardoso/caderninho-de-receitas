import React, { FC } from 'react';
import List from '@material-ui/core/List';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Image from '../image';
import AminoAcidsTable from '../aminoacids-table';
import { Food, FoodVersion } from '../../services/food';

interface Props {
  food: Food;
  quantity?: number;
  version?: FoodVersion;
}

export type FoodDetailedProps = GridProps & Props;

const FoodDetailed: FC<FoodDetailedProps> = ({
  food,
  quantity = 100,
  ...props
}) => {
  const { image, gi, calories, carbohydrates, gl } = food;
  const { aminoAcids } = food;
  const multiplier = quantity / 100;

  function renderQuality({ name: foodName = '', value = 0 }) {
    return (
      <ListItem disableGutters>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item>
            <Typography component="h2">{foodName}</Typography>
          </Grid>
          <Grid item>
            <Typography>{value}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }

  return (
    <Grid container spacing={4} justifyContent="center" {...props}>
      <Grid item xs={8} sm={6} md={4}>
        <Image src={image} alt="" />
      </Grid>
      <Grid item xs={12}>
        <List>
          {renderQuality({ name: 'Índice Glicêmico', value: gi })}
          {renderQuality({ name: 'Calorias', value: calories * multiplier })}
          {renderQuality({
            name: 'Carboidratos',
            value: carbohydrates * multiplier,
          })}
          {renderQuality({ name: 'Carga Glicêmica', value: gl })}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              Tabela de aminoácidos
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <AminoAcidsTable aminoAcids={aminoAcids} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FoodDetailed;
