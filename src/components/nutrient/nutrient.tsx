import React, { FC } from 'react';
import Round from 'lodash/round';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
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
          <Typography component="h2">{nutrient.nick}</Typography>
        </Grid>
        <Grid item>
          <Typography style={{ whiteSpace: 'nowrap' }}>
            {Round(nutrient.quantity, 2)}
            {nutrient.unity}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default NutrientDisplay;
