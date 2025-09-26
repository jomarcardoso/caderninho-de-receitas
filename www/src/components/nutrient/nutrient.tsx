import React, { FC } from 'react';
import round from 'lodash/round';
import { Nutrient } from '../../services/nutrient/nutrient.model';

const NutrientDisplay: FC<{ nutrient: Nutrient }> = ({ nutrient }) => {
  if (!nutrient.quantity) return null;

  return (
    <div className="d-flex gap-1 justify-content-between">
      <div>{nutrient.shortName}</div>

      <p style={{ whiteSpace: 'nowrap' }}>
        {String(round(nutrient.quantity, 2)).replace('.', ',')}
        {nutrient.measurementUnit}
      </p>
    </div>
  );
};

export default NutrientDisplay;
