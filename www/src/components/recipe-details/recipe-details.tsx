import { Language } from '@/contexts/language';
import { Food } from '@common/services/food/food.model';
import { translate } from '@common/services/language/language.service';
import {
  formatNumber,
  roundToMaximumDecimals,
} from '@common/services/number/number.service';
import { Nutrient } from '@common/services/nutrient/nutrient.model';
import { Recipe } from '@common/services/recipe';
import type { FC, ReactElement } from 'react';
import { Ingredients } from '../ingredients/ingredients';
import { Preparation } from '../preparation/preparation';
import { NutrientDisplay } from '../nutrient/nutrient';
import { ListItem } from '../list-item/list-item';
import { AminoAcidsTable } from '../aminoacids-table/aminoacids-table';
import { SectionCard } from 'notebook-layout';

export interface RecipeDetailsProps {
  recipe?: Recipe;
  // When true, vitamins/minerals/amino acids/nutritional info render within SectionCard.
  // When false, they render as plain blocks (legacy app appearance).
  nutrientSectionsWithCards?: boolean;
}

export const RecipeDetails: FC<RecipeDetailsProps> = ({
  recipe,
  nutrientSectionsWithCards = true,
}) => {
  const language: Language = 'pt';

  const renderNutrient = (nutrient: Nutrient): ReactElement | null => {
    if (!nutrient.quantity) return null;

    return (
      <ListItem noGutters noBorder key={nutrient.name.en}>
        <NutrientDisplay nutrient={nutrient} />
      </ListItem>
    );
  };

  const renderNutritionalInformation = ({
    name,
    quantity,
    measurementUnit,
  }: Nutrient) => {
    if (!quantity) return null;

    const roundedQuantity = roundToMaximumDecimals(quantity);
    const formattedQuantity = formatNumber(
      roundedQuantity ?? quantity,
      language,
    );

    return (
      <ListItem noGutters noBorder key={`${name[language]}-${quantity}`}>
        <div className="w-100 d-flex gap-1 justify-content-between">
          <div>{name[language]}</div>

          <div>
            {formattedQuantity}
            {measurementUnit}
          </div>
        </div>
      </ListItem>
    );
  };

  const steps = Array.isArray(recipe?.steps) ? recipe!.steps : [];
  const nutritionalInformation = Array.isArray(recipe?.nutritionalInformation)
    ? (recipe!.nutritionalInformation as Nutrient[])
    : [];

  return (
    <div className="grid columns-1 g-6">
      {recipe?.description && <p>{recipe.description}</p>}

      {steps.map((step) => (
        <SectionCard title={step.title} key={step.ingredientsText}>
          <div className="grid columns-1 g-6">
            {step.ingredients.length ? (
              <Ingredients ingredients={step.ingredients} />
            ) : (
              ''
            )}

            {step.preparation && (
              <Preparation
                preparation={step.preparation}
                title={step.ingredients.length ? undefined : ''}
              />
            )}

            {step.additional && <div>{step.additional}</div>}
          </div>
        </SectionCard>
      ))}

      {recipe?.additional && <div>{recipe.additional}</div>}

      <div className="grid columns-1 g-3">
        <h2 className="h2">{translate('nutritionalInformation', language)}</h2>
        <ul>{nutritionalInformation.map(renderNutritionalInformation)}</ul>
      </div>

      <div className="grid columns-1 g-3">
        <h3 className="section-title">{translate('vitamins', language)}</h3>
        <ul className="list">{recipe?.vitamins.map(renderNutrient)}</ul>
      </div>

      <div className="grid columns-1 g-3">
        <h3 className="section-title">{translate('minerals', language)}</h3>
        <ul className="list">{recipe?.minerals.map(renderNutrient)}</ul>
      </div>

      {Array.isArray(recipe?.aminoAcids) && (
        <AminoAcidsTable
          contrast="light"
          essentialAminoAcids={recipe.aminoAcids}
        />
      )}
    </div>
  );
};
