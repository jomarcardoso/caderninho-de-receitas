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
  const {
    image,
    gi,
    calories,
    carbohydrates,
    gl,
    proteins,
    vitamins,
    minerals,
  } = food;
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
          {renderQuality({ name: 'Proteínas', value: proteins })}
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
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              Vitaminas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              {renderQuality({ name: 'A', value: vitamins.a })}
              {renderQuality({
                name: 'Alfa-caroteno',
                value: vitamins.alphaCarotene,
              })}
              {renderQuality({ name: 'B1', value: vitamins.b1 })}
              {renderQuality({ name: 'B2', value: vitamins.b2 })}
              {renderQuality({ name: 'B3', value: vitamins.b3 })}
              {renderQuality({ name: 'B5', value: vitamins.b5 })}
              {renderQuality({ name: 'B6', value: vitamins.b6 })}
              {renderQuality({ name: 'B7', value: vitamins.b7 })}
              {renderQuality({ name: 'B9', value: vitamins.b9 })}
              {renderQuality({ name: 'B12', value: vitamins.b12 })}
              {renderQuality({
                name: 'Betacaroteno',
                value: vitamins.betaCarotene,
              })}
              {renderQuality({
                name: 'C',
                value: vitamins.c,
              })}
              {renderQuality({
                name: 'Colina',
                value: vitamins.choline,
              })}
              {renderQuality({
                name: 'Criptoxantina',
                value: vitamins.cryptoxanthinCarotene,
              })}
              {renderQuality({
                name: 'D',
                value: vitamins.d,
              })}
              {renderQuality({
                name: 'D2',
                value: vitamins.d2,
              })}
              {renderQuality({
                name: 'D3',
                value: vitamins.d3,
              })}
              {renderQuality({
                name: 'E',
                value: vitamins.e,
              })}
              {renderQuality({
                name: 'Ácido fólico',
                value: vitamins.folicAcid,
              })}
              {renderQuality({
                name: 'K',
                value: vitamins.k,
              })}
              {renderQuality({
                name: 'K1',
                value: vitamins.k1,
              })}
              {renderQuality({
                name: 'Licopeno',
                value: vitamins.lycopene,
              })}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              Minerais
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>
              {renderQuality({ name: 'Cálcio', value: minerals.calcium })}
            </List>
            <List>
              {renderQuality({ name: 'Cobre', value: minerals.copper })}
            </List>
            <List>
              {renderQuality({ name: 'Fluor', value: minerals.fluoride })}
            </List>
            <List>
              {renderQuality({ name: 'Fluoreto', value: minerals.fluoride })}
            </List>
            <List>
              {renderQuality({ name: 'Ferro', value: minerals.iron })}
            </List>
            <List>
              {renderQuality({ name: 'Magnésio', value: minerals.magnesium })}
            </List>
            <List>
              {renderQuality({ name: 'Manganês', value: minerals.manganese })}
            </List>
            <List>
              {renderQuality({ name: 'Fósforo', value: minerals.phosphorus })}
            </List>
            <List>
              {renderQuality({ name: 'Potássio', value: minerals.potassium })}
            </List>
            <List>
              {renderQuality({ name: 'Sódio', value: minerals.sodium })}
            </List>
            <List>
              {renderQuality({ name: 'Zinco', value: minerals.zinc })}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FoodDetailed;
