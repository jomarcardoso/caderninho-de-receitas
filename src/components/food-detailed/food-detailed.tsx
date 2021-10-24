import React, { FC, ReactElement } from 'react';
import List from '@material-ui/core/List';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Image from '../image/image';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import { Food } from '../../services/food';
import { VITAMINS } from '../../services/vitamin';
import { MINERALS } from '../../services/mineral';
import { Nutrient } from '../../services/nutrient.constants';
import NutrientDisplay from '../nutrient/nutrient';
import { AminoAcidService } from '../../services/amino-acid';

interface Props {
  food: Food;
  quantity?: number;
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

  function renderNutrient(nutrient: Nutrient): ReactElement {
    if (!nutrient.quantity) return <></>;

    return (
      <ListItem disableGutters>
        <NutrientDisplay nutrient={nutrient} />
      </ListItem>
    );
  }

  return (
    <Grid container spacing={4} justifyContent="center" {...props}>
      <Image src={image} alt="" aspectRatio={1.25} />
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
      {AminoAcidService.hasAminoAcid(aminoAcids) && (
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
      )}
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2" component="h2">
              Vitaminas
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List>{Object.values(vitamins).map(renderNutrient)}</List>
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
            <List>{Object.values(minerals).map(renderNutrient)}</List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FoodDetailed;
