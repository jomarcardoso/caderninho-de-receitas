import React, { FC, HTMLProps, ReactElement } from 'react';
import Image from '../image/image';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import { Food } from '../../services/food';
import { VITAMINS } from '../../services/vitamin';
import { MINERALS } from '../../services/mineral';
import { Nutrient } from '../../services/nutrient.constants';
import NutrientDisplay from '../nutrient/nutrient';
import { AminoAcidService } from '../../services/amino-acid';
import { ListItem } from '../list-item/list-item';
import round from 'lodash/round';

interface FoodDetailedProps extends HTMLProps<HTMLDivElement> {
  food: Food;
  quantity?: number;
}

const FoodDetailed: FC<FoodDetailedProps> = ({
  food,
  quantity = 100,
  ...props
}) => {
  const {
    image,
    gi,
    calories,
    carbohydrates,
    totalFat,
    cholesterol,
    saturedFats,
    monounsaturatedFats,
    polyunsaturatedFats,
    ashes,
    gl,
    proteins,
    dietaryFiber,
    vitamins = VITAMINS,
    minerals = MINERALS,
  } = food;
  const { aminoAcids } = food;
  const multiplier = quantity / 100;

  const hasMinerals = Object.values(minerals).some(
    (mineral) => mineral.quantity,
  );

  const hasVitamins = Object.values(vitamins).some(
    (vitamin) => vitamin.quantity,
  );

  const hasAminoAcids = AminoAcidService.verifyHasAminoAcid(aminoAcids);

  const hasNutrients =
    hasMinerals ||
    hasVitamins ||
    hasAminoAcids ||
    calories ||
    gi ||
    gl ||
    carbohydrates ||
    proteins;

  function renderQuality({ name: quality = '', value = 0 }) {
    if (!value) return null;

    return (
      <ListItem noGutters noBorder>
        <div className="w-100 d-flex justify-content-between gap-3">
          <div>
            <h2>{quality}</h2>
          </div>

          <div>{String(value).replace('.', ',')}</div>
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
                {renderQuality({ name: 'Índice Glicêmico', value: gi })}
                {renderQuality({
                  name: 'Calorias',
                  value: Math.round(calories * multiplier),
                })}
                {renderQuality({
                  name: 'Carboidratos',
                  value: Math.round(carbohydrates * multiplier),
                })}
                {renderQuality({
                  name: 'Proteínas',
                  value: round(proteins * multiplier, 2),
                })}
                {renderQuality({
                  name: 'Fibras',
                  value: round(dietaryFiber * multiplier, 2),
                })}
                {renderQuality({
                  name: 'Gorduras totais',
                  value: round(totalFat * multiplier, 2),
                })}
                {renderQuality({
                  name: 'Colesterol',
                  value: round(cholesterol * multiplier, 2),
                })}
                {renderQuality({
                  name: 'Gordura saturada',
                  value: round(saturedFats * multiplier, 2),
                })}
                {renderQuality({
                  name: 'Gordura monosaturada',
                  value: round(monounsaturatedFats * multiplier, 2),
                })}
                {renderQuality({
                  name: 'Gordura polisaturada',
                  value: round(polyunsaturatedFats * multiplier, 2),
                })}
                {renderQuality({
                  name: 'Carga Glicêmica',
                  value: round(gl * multiplier, 2),
                })}
                {renderQuality({
                  name: 'Cinzas',
                  value: round(ashes * multiplier, 2),
                })}
              </ul>

              {hasAminoAcids && <AminoAcidsTable aminoAcids={aminoAcids} />}
            </div>

            {hasVitamins && (
              <div className="grid g-2 columns-1">
                <h2 className="h2">Vitaminas</h2>

                <ul className="list">
                  {Object.values(vitamins).map(renderNutrient)}
                </ul>
              </div>
            )}

            {hasMinerals && (
              <div className="grid g-2 columns-1">
                <h2 className="h2">Minerais</h2>

                <ul className="list">
                  {Object.values(minerals).map(renderNutrient)}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Não há informações nutricionais deste alimento.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDetailed;
