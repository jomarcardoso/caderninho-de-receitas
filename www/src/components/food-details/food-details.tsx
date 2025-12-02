import type { FC, HTMLAttributes, ReactElement } from 'react';
import type { Food } from '@common/services/food/food.model';
import type { Nutrient } from '@common/services/nutrient/nutrient.model';
import {
  formatNumber,
  roundToMaximumDecimals,
} from '@common/services/number/number.service';
import { Language } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';
import { Image2 } from '@/components/image-2/image';
import { ListItem } from '@/components/list-item/list-item';
import { NutrientDisplay } from '@/components/nutrient/nutrient';
import { AminoAcidsTable } from '@/components/aminoacids-table/aminoacids-table';

export interface FoodDetailsProps extends HTMLAttributes<HTMLDivElement> {
  food?: Food | null;
  quantity?: number;
  showName?: boolean;
}

const FoodDetails: FC<FoodDetailsProps> = ({
  food,
  quantity = 100,
  className = '',
  showName = false,
  ...props
}) => {
  const language: Language = 'pt';

  if (!food) {
    return (
      <div className={`food-details ${className}`} {...props}>
        <p>{translate('noNutritionalInformation', language)}</p>
      </div>
    );
  }

  const nutritionalInformation = Array.isArray(food.nutritionalInformation)
    ? food.nutritionalInformation
    : [];
  const vitamins = Array.isArray(food.vitamins) ? food.vitamins : [];
  const minerals = Array.isArray(food.minerals) ? food.minerals : [];
  const aminoAcids = Array.isArray(food.aminoAcids) ? food.aminoAcids : [];

  const hasNutrients =
    nutritionalInformation.length ||
    vitamins.length ||
    minerals.length ||
    aminoAcids.length;

  const unit =
    food?.type?.en === 'liquid' || food?.type?.en === 'oil' ? 'ml' : 'g';

  const description = food.description?.[language];

  const renderNutritionalInfo = ({
    name,
    quantity: nutrientQuantity,
    measurementUnit,
  }: Nutrient): ReactElement | null => {
    if (!nutrientQuantity) return null;

    const roundedQuantity = roundToMaximumDecimals(nutrientQuantity);
    const formattedQuantity = formatNumber(
      roundedQuantity ?? nutrientQuantity,
      language,
    );

    if (!formattedQuantity) return null;

    return (
      <ListItem
        noBorder
        noGutters
        key={`${name?.[language] ?? ''}-${measurementUnit}`}
      >
        <div className="w-100 d-flex justify-content-between gap-3">
          <span>{name?.[language] ?? ''}</span>
          <span>
            {formattedQuantity}
            {measurementUnit}
          </span>
        </div>
      </ListItem>
    );
  };

  const renderNutrient = (
    nutrient: Nutrient,
    index: number,
  ): ReactElement | null => {
    if (!nutrient.quantity) return null;

    return (
      <ListItem
        noBorder
        noGutters
        key={`${nutrient.name?.[language] ?? ''}-${index}`}
      >
        <NutrientDisplay nutrient={nutrient} />
      </ListItem>
    );
  };

  return (
    <div className={`food-details grid columns-1 g-6 ${className}`} {...props}>
      <div className="grid columns-1 g-3">
        <Image2
          srcs={[...(food.imgs ?? []), ...(food.icon ?? [])]}
          alt={food.name?.[language] ?? ''}
          aspectRatio={1.25}
          transparent
        />

        <div className="grid columns-1 g-2 px-2">
          <div>
            {showName && <h2 className="h2">{food.name?.[language]}</h2>}
            {description && <p className="mt-3">{description}</p>}
          </div>

          <p className="body-small mt-2">
            {translate('nutritionalInformation', language)} • {quantity}
            {unit}
          </p>
        </div>
      </div>

      {hasNutrients ? (
        <div className="grid columns-1 g-5 px-2">
          {nutritionalInformation.length > 0 && (
            <div className="grid columns-1 g-2">
              <h3 className="section-title">
                {translate('nutritionalInformation', language)}
              </h3>
              <ul className="list">
                {nutritionalInformation.map(renderNutritionalInfo)}
              </ul>
            </div>
          )}

          {vitamins.length > 0 && (
            <div className="grid columns-1 g-2">
              <h3 className="section-title">
                {translate('vitamins', language)}
              </h3>
              <ul className="list">
                {vitamins.map((nutrient, index) =>
                  renderNutrient(nutrient, index),
                )}
              </ul>
            </div>
          )}

          {minerals.length > 0 && (
            <div className="grid columns-1 g-2">
              <h3 className="section-title">
                {translate('minerals', language)}
              </h3>
              <ul className="list">
                {minerals.map((nutrient, index) =>
                  renderNutrient(nutrient, index),
                )}
              </ul>
            </div>
          )}

          {aminoAcids.length > 0 && (
            <AminoAcidsTable
              contrast="light"
              essentialAminoAcids={aminoAcids}
            />
          )}
        </div>
      ) : (
        <p>{translate('noNutritionalInformation', language)}</p>
      )}
    </div>
  );
};

export default FoodDetails;
