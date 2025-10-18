import { type FC, type HTMLProps, type ReactElement, useContext } from 'react';
import Image from '../image/image';
import { AminoAcidsTable } from '../aminoacids-table/aminoacids-table';
import NutrientDisplay from '../nutrient/nutrient';
import { ListItem } from '../list-item/list-item';
import round from 'lodash/round';
import type { Food } from 'services/food/food.model';
import type { Nutrient } from 'services/nutrient/nutrient.model';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';

interface FoodDetailedProps extends HTMLProps<HTMLDivElement> {
  food: Food;
  quantity?: number;
}

const FoodDetailed: FC<FoodDetailedProps> = ({
  food,
  quantity = 100,
  ...props
}) => {
  const { image, vitamins, minerals, aminoAcids, nutritionalInformation } =
    food;
  const { language } = useContext(LanguageContext);

  const hasNutrients =
    minerals.length ||
    vitamins.length ||
    aminoAcids.length ||
    nutritionalInformation.length;

  function renderQuality({ name: quality, quantity = 0 }: Nutrient) {
    if (!quantity) return null;

    return (
      <ListItem noGutters noBorder>
        <div className="w-100 d-flex justify-content-between gap-3">
          <div>
            <h2>{quality[language]}</h2>
          </div>

          <div>{String(quantity).replace('.', ',')}</div>
        </div>
      </ListItem>
    );
  }

  function renderNutrient(nutrient: Nutrient): ReactElement | null {
    if (!nutrient.quantity) return null;

    return (
      <ListItem noGutters noBorder>
        <NutrientDisplay nutrient={nutrient} />
      </ListItem>
    );
  }

  return (
    <div className="grid g-4 columns-1" {...props}>
      <Image src={image} alt="" aspectRatio={1.25} />

      <div className="container">
        {hasNutrients ? (
          <div className="grid g-7 columns-1">
            <div className="grid g-4 columns-1">
              <ul className="list">
                {food.nutritionalInformation.map(renderQuality)}
              </ul>

              {aminoAcids.length && (
                <AminoAcidsTable essentialAminoAcids={aminoAcids} />
              )}
            </div>

            {vitamins.length && (
              <div className="grid g-2 columns-1">
                <h2 className="h2">{translate('vitamins', language)}</h2>

                <ul className="list">
                  {Object.values(vitamins).map(renderNutrient)}
                </ul>
              </div>
            )}

            {minerals.length && (
              <div className="grid g-2 columns-1">
                <h2 className="h2">{translate('minerals', language)}</h2>

                <ul className="list">
                  {Object.values(minerals).map(renderNutrient)}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>{translate('noNutritionalInformation', language)}</p>
        )}
      </div>
    </div>
  );
};

export default FoodDetailed;

