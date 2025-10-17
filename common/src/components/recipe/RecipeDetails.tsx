"use client";

import type { FC, ReactElement } from 'react';
import type { Food } from '../../services/food/food.model';
import type { Recipe } from '../../services/recipe/recipe.model';
import type { Nutrient } from '../../services/nutrient/nutrient.model';
import type { RecipeStep } from '../../services/recipe-step';
import { translate } from '../../services/language/language.service';
import type { Language } from '../../services/language/language.types';
import { formatNumber, roundToMaximumDecimals } from '../../services/number';

type IngredientsProps = {
  ingredients: RecipeStep['ingredients'];
  setCurrentFood?: (food: Food) => void;
  setCurrentFoodQuantity?: (quantity: number) => void;
};

type PreparationProps = {
  preparation: string;
  title?: string;
};

type NutrientDisplayProps = { nutrient: Nutrient };

type ListItemProps = {
  noGutters?: boolean;
  noBorder?: boolean;
  children: React.ReactNode;
};

type AminoAcidsTableProps = {
  contrast?: 'light' | 'dark';
  essentialAminoAcids: Nutrient[];
};

type SectionCardProps = {
  title?: string;
  children: React.ReactNode;
};

export interface RecipeDetailsProps {
  recipe?: Recipe;
  language: Language;
  setCurrentFood?(food: Food): void;
  setCurrentFoodQuantity?(quantity: number): void;
  components: {
    Ingredients: React.ComponentType<IngredientsProps>;
    Preparation: React.ComponentType<PreparationProps>;
    NutrientDisplay: React.ComponentType<NutrientDisplayProps>;
    ListItem: React.ComponentType<ListItemProps>;
    AminoAcidsTable: React.ComponentType<AminoAcidsTableProps>;
    SectionCard: React.ComponentType<SectionCardProps>;
  };
}

export const RecipeDetails: FC<RecipeDetailsProps> = ({
  recipe,
  language,
  setCurrentFood,
  setCurrentFoodQuantity,
  components,
}) => {
  const { Ingredients, Preparation, NutrientDisplay, ListItem, AminoAcidsTable, SectionCard } = components;

  const renderNutrient = (nutrient: Nutrient): ReactElement | null => {
    if (!nutrient.quantity) return null;

    return (
      <ListItem noGutters noBorder key={nutrient.name.en}>
        <NutrientDisplay nutrient={nutrient} />
      </ListItem>
    );
  };

  const renderNutritionalInformation = ({ name, quantity, measurementUnit }: Nutrient) => {
    if (!quantity) return null;

    const roundedQuantity = roundToMaximumDecimals(quantity);
    const formattedQuantity = formatNumber(roundedQuantity ?? quantity, language);

    return (
      <ListItem noGutters noBorder>
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
              <Ingredients
                ingredients={step.ingredients}
                setCurrentFood={setCurrentFood}
                setCurrentFoodQuantity={setCurrentFoodQuantity}
              />
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

      {nutritionalInformation.length > 0 && (
        <SectionCard title={translate('nutritionalInformation', language)}>
          <div className="grid columns-1 g-3">
            <ul>{nutritionalInformation.map(renderNutritionalInformation)}</ul>
          </div>
        </SectionCard>
      )}

      {recipe?.vitamins?.length && (
        <SectionCard title={translate('vitamins', language)}>
          <div className="grid columns-1 g-3">
            <ul className="list">{recipe?.vitamins.map(renderNutrient)}</ul>
          </div>
        </SectionCard>
      )}

      {recipe?.minerals?.length && (
        <SectionCard title={translate('minerals', language)}>
          <div className="grid columns-1 g-3">
            <ul className="list">{recipe?.minerals.map(renderNutrient)}</ul>
          </div>
        </SectionCard>
      )}

      {recipe?.aminoAcids?.length && recipe?.aminoAcids && (
        <SectionCard title={translate('aminoAcidsTableTitle', language)}>
          <AminoAcidsTable contrast="light" essentialAminoAcids={recipe.aminoAcids} />
        </SectionCard>
      )}
    </div>
  );
};

export default RecipeDetails;
