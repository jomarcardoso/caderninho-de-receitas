import React, { FC, ReactElement } from 'react';
import round from 'lodash/round';
import Slide, { SlideProps } from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Image from '../image/image';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import Section from '../section/section';
import { RECIPE, Recipe } from '../../services/recipe';
import { Food } from '../../services/food';
import SectionCard from '../section-card/section-card';
import { AminoAcidService } from '../../services/amino-acid';
import NutrientDisplay from '../nutrient/nutrient';
import './recipe-container.scss';
import { Nutrient } from '../../services/nutrient.constants';
import { ListItem } from '../list-item/list-item';

const HideOnScroll: FC<SlideProps> = ({ children, ...props }) => {
  const trigger = useScrollTrigger({
    target: document.querySelector('#recipe-panel') as HTMLElement,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger} {...props}>
      {children}
    </Slide>
  );
};

export interface RecipeContainerProps {
  recipe: Recipe;
  setCurrentFood(food: Food): void;
  setCurrentFoodQuantity(quantity: number): void;
}

const RecipeContainer: FC<RecipeContainerProps> = ({
  recipe = RECIPE,
  setCurrentFood,
  setCurrentFoodQuantity,
}) => {
  const hasVitamins = Object.values(recipe.vitamins).some(
    (vitamin) => vitamin.quantity,
  );

  const hasMinerals = Object.values(recipe.minerals).some(
    (mineral) => mineral.quantity,
  );

  function renderNutrient(nutrient: Nutrient): ReactElement | null {
    if (!nutrient.quantity) return null;

    return (
      <ListItem noGutters noBorder>
        <NutrientDisplay nutrient={nutrient} key={nutrient.name} />
      </ListItem>
    );
  }

  function renderQuality({ name: foodName = '', value = 0 }) {
    if (!value) return null;

    return (
      <ListItem noGutters noBorder>
        <div className="w-100 d-flex gap-1 justify-content-between">
          <div>{foodName}</div>

          <div>{round(value, 2)}</div>
        </div>
      </ListItem>
    );
  }

  return (
    <div className="recipe-container">
      {recipe.name && (
        <HideOnScroll>
          <div className="recipe-container__name">
            <div className="container">
              <h2
                className="h2"
                style={{ fontSize: recipe.name.length > 30 ? 17 : 19 }}
              >
                {recipe.name}
              </h2>
            </div>
          </div>
        </HideOnScroll>
      )}
      <div style={{ marginBottom: '24px' }}>
        <Image src={recipe.image} alt="" aspectRatio={1.25} />
      </div>
      <div className="recipe-container__body container">
        <div className="grid columns-1 g-6">
          {recipe.description && <div>{recipe.description}</div>}

          {recipe.steps.map((step) => (
            <SectionCard title={step.name} key={step.ingredients.join('')}>
              <div className="grid columns-1 g-4">
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

          {recipe.additional && <div>{recipe.additional}</div>}

          <div className="grid columns-1 g-3">
            <h2 className="h2">Informações nutricionais</h2>

            <ul>
              {renderQuality({
                name: 'Calorias',
                value: recipe.calories,
              })}
              {renderQuality({
                name: 'Carboidratos',
                value: recipe.carbohydrates,
              })}
              {renderQuality({
                name: 'Proteínas',
                value: recipe.proteins,
              })}
              {renderQuality({
                name: 'Gorduras totais',
                value: recipe.totalFat,
              })}
              {renderQuality({
                name: 'Fibras',
                value: recipe.dietaryFiber,
              })}
            </ul>
          </div>

          {hasVitamins && (
            <Section title="Vitaminas">
              <ul className="list">
                {Object.values(recipe.vitamins).map(renderNutrient)}
              </ul>
            </Section>
          )}

          {hasMinerals && (
            <Section title="Minerais">
              <ul className="list">
                {Object.values(recipe.minerals).map(renderNutrient)}
              </ul>
            </Section>
          )}

          {AminoAcidService.verifyHasAminoAcid(recipe.aminoAcids) && (
            <AminoAcidsTable contrast="light" aminoAcids={recipe.aminoAcids} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeContainer;
