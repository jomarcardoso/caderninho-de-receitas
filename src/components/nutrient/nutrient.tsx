import React, { FC } from 'react';
import Round from 'lodash/round';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { NUTRIENT, Nutrient } from '../../services/nutrient.constants';

const NutrientDisplay: FC<{ nutrient: Nutrient }> = ({
  nutrient = NUTRIENT,
}) => {
  if (!nutrient.quantity) return <></>;

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
