import { useContext, type FC } from 'react';
import {
  formatNumber,
  roundToMaximumDecimals,
} from '@common/services/number/number.service';
import { Language } from '@/contexts/language';
import type { Nutrient } from 'services/nutrient/nutrient.model';

export const NutrientDisplay: FC<{ nutrient: Nutrient }> = ({ nutrient }) => {
  if (!nutrient.quantity) return null;

  const language: Language = 'pt';
  const roundedQuantity = roundToMaximumDecimals(nutrient.quantity);
  const formattedQuantity = formatNumber(
    roundedQuantity ?? nutrient.quantity,
    language,
  );

  if (!formattedQuantity) return null;

  return (
    <div className="d-flex gap-1 justify-content-between">
      <div>{nutrient.shortName}</div>

      <p style={{ whiteSpace: 'nowrap' }}>
        {formattedQuantity}
        {nutrient.measurementUnit}
      </p>
    </div>
  );
};
"use client";
