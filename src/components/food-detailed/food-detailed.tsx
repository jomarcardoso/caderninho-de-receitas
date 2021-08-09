import React, { FC, ReactElement } from 'react';
import List from '@material-ui/core/List';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Round from 'lodash/round';
import Image from '../image';
import AminoAcidsTable from '../aminoacids-table';
import { Food, FoodVersion, MINERALS } from '../../services/food';
import { VITAMIN, VITAMINS } from '../../services/vitamin';

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
    vitamins = VITAMINS,
    minerals = MINERALS,
  } = food;
  const { aminoAcids } = food;
  const multiplier = quantity / 100;

  function renderQuality({ name: foodName = '', value = 0 }) {
    if (!value) return null;

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

  function renderVitamin(vitamin = VITAMIN): ReactElement {
    if (!vitamin.quantity) return <></>;

    return (
      <ListItem disableGutters>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item>
            <Typography component="h2">{vitamin.nick}</Typography>
          </Grid>
          <Grid item>
            <Typography style={{ whiteSpace: 'nowrap' }}>
              {Round(vitamin.quantity, 2)}
              {vitamin.unity}
            </Typography>
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
            <List>{Object.values(vitamins).map(renderVitamin)}</List>
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
