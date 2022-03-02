import React, { FC, ReactElement } from 'react';
import List from '@mui/material/List';
import Grid, { GridProps } from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import round from 'lodash/round';
import ListItem from '@mui/material/ListItem';
import Image from '../image/image';
import Container from '../container/container';
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
    totalFat,
    cholesterol,
    saturedFats,
    monounsaturatedFats,
    polyunsaturatedFats,
    ashes,
    gl,
    proteins,
    dietaryFiber,
    vitamins = VITAMINS,
    minerals = MINERALS,
  } = food;
  const { aminoAcids } = food;
  const multiplier = quantity / 100;

  const hasMinerals = Object.values(minerals).some(
    (mineral) => mineral.quantity,
  );

  const hasVitamins = Object.values(vitamins).some(
    (vitamin) => vitamin.quantity,
  );

  const hasAminoAcids = AminoAcidService.verifyHasAminoAcid(aminoAcids);

  const hasNutrients =
    hasMinerals ||
    hasVitamins ||
    hasAminoAcids ||
    calories ||
    gi ||
    gl ||
    carbohydrates ||
    proteins;

  function renderQuality({ name: foodName = '', value = 0 }) {
    if (!value) return null;

    return (
      <ListItem disableGutters>
        <Grid container spacing={1} justifyContent="space-between">
          <Grid item>
            <Typography component="h2">{foodName}</Typography>
          </Grid>
          <Grid item>
            <Typography>{round(value, 2)}</Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  }

  function renderNutrient(nutrient: Nutrient): ReactElement | null {
    if (!nutrient.quantity) return null;

    return (
      <ListItem disableGutters>
        <NutrientDisplay nutrient={nutrient} />
      </ListItem>
    );
  }

  return (
    <Grid container spacing={4} justifyContent="center" {...props}>
      <Grid item xs={12}>
        <Image src={image} alt="" aspectRatio={1.25} />
      </Grid>
      <Grid item xs={12}>
        <Container>
          {hasNutrients ? (
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12}>
                <List>
                  {renderQuality({ name: 'Índice Glicêmico', value: gi })}
                  {renderQuality({
                    name: 'Calorias',
                    value: calories * multiplier,
                  })}
                  {renderQuality({
                    name: 'Carboidratos',
                    value: carbohydrates * multiplier,
                  })}
                  {renderQuality({
                    name: 'Proteínas',
                    value: proteins * multiplier,
                  })}
                  {renderQuality({
                    name: 'Fibras',
                    value: dietaryFiber * multiplier,
                  })}
                  {renderQuality({
                    name: 'Gorduras totais',
                    value: totalFat * multiplier,
                  })}
                  {renderQuality({
                    name: 'Colesterol',
                    value: cholesterol * multiplier,
                  })}
                  {renderQuality({
                    name: 'Gordura saturada',
                    value: saturedFats * multiplier,
                  })}
                  {renderQuality({
                    name: 'Gordura monosaturada',
                    value: monounsaturatedFats * multiplier,
                  })}
                  {renderQuality({
                    name: 'Gordura polisaturada',
                    value: polyunsaturatedFats * multiplier,
                  })}
                  {renderQuality({
                    name: 'Carga Glicêmica',
                    value: gl * multiplier,
                  })}
                  {renderQuality({
                    name: 'Cinzas',
                    value: ashes * multiplier,
                  })}
                </List>
              </Grid>
              {hasAminoAcids && (
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
              {hasVitamins && (
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
              )}
              {hasMinerals && (
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
              )}
            </Grid>
          ) : (
            <Typography>
              Não há informações nutricionais deste alimento.
            </Typography>
          )}
        </Container>
      </Grid>
    </Grid>
  );
};

export default FoodDetailed;
