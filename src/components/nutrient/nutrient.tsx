import React, { FC } from 'react';
import Round from 'lodash/round';
import ListItem from '@mui/material/ListItem';
import { NUTRIENT, Nutrient } from '../../services/nutrient.constants';

const NutrientDisplay: FC<{ nutrient: Nutrient }> = ({
  nutrient = NUTRIENT,
}) => {
  if (!nutrient.quantity) return null;

  return (
    <ListItem disableGutters>
      <div className="w-100 d-flex gap-1 justify-content-between">
        <h3>{nutrient.nick}</h3>

        <p style={{ whiteSpace: 'nowrap' }}>
          {Round(nutrient.quantity, 2)}
          {nutrient.unity}
        </p>
      </div>
    </ListItem>
  );
};

export default NutrientDisplay;
