import { useContext, type FC } from 'react';
import { formatNumber, roundToMaximumDecimals } from '../../services/number';
import { LanguageContext } from '../../providers/language/language.context';
import type { Nutrient } from '../../services/nutrient/nutrient.model';

const NutrientDisplay: FC<{ nutrient: Nutrient }> = ({ nutrient }) => {
  if (!nutrient.quantity) return null;

  const { language } = useContext(LanguageContext);
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

export default NutrientDisplay;
