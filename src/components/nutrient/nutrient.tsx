import React, { FC } from 'react';
import { NUTRIENT, Nutrient } from '../../services/nutrient.constants';

const NutrientDisplay: FC<{ nutrient: Nutrient }> = ({
  nutrient = NUTRIENT,
}) => {
  if (!nutrient.quantity) return null;

  return (
    <div className="d-flex gap-1 justify-content-between">
      <div>{nutrient.nick}</div>

      <p style={{ whiteSpace: 'nowrap' }}>
        {nutrient.quantity.toFixed(2)}
        {nutrient.unity}
      </p>
    </div>
  );
};

export default NutrientDisplay;
