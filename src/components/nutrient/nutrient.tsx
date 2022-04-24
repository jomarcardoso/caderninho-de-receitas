import React, { FC } from 'react';
import Round from 'lodash/round';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import { NUTRIENT, Nutrient } from '../../services/nutrient.constants';

const NutrientDisplay: FC<{ nutrient: Nutrient }> = ({
  nutrient = NUTRIENT,
}) => {
  if (!nutrient.quantity) return null;

  return (
    <ListItem disableGutters>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item>
          <h3>{nutrient.nick}</h3>
        </Grid>
        <Grid item>
          <p style={{ whiteSpace: 'nowrap' }}>
            {Round(nutrient.quantity, 2)}
            {nutrient.unity}
          </p>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default NutrientDisplay;
