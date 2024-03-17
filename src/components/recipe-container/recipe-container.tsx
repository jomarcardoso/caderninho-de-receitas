import React, { FC, ReactElement, useEffect } from 'react';
import { StickyHeader } from 'ovos';
import Image from '../image/image';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import { RECIPE, Recipe } from '../../services/recipe';
import { Food } from '../../services/food';
import SectionCard from '../section-card/section-card';
import { AminoAcidService } from '../../services/amino-acid';
import NutrientDisplay from '../nutrient/nutrient';
import './recipe-container.scss';
import { Nutrient } from '../../services/nutrient.constants';
import { ListItem } from '../list-item/list-item';

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
      <ListItem noGutters noBorder key={nutrient.name}>
        <NutrientDisplay nutrient={nutrient} />
      </ListItem>
    );
  }

  function renderQuality({ name: foodName = '', value = 0 }) {
    if (!value) return null;

    return (
      <ListItem noGutters noBorder>
        <div className="w-100 d-flex gap-1 justify-content-between">
          <div>{foodName}</div>

          <div>{value.toFixed(2)}</div>
        </div>
      </ListItem>
    );
  }

  useEffect(() => {
    StickyHeader({});
  }, []);

  console.log('oi');

  return (
    <div className="recipe-container">
      {recipe.name && (
        <div
          data-ovo-sticky-header
          style={{
            position: 'sticky',
            top: 0,
            right: 0,
            width: '100vw',
            zIndex: 1,
          }}
        >
          <div className="recipe-container__name">
            <div className="container">
              <h1
                className="h2"
                style={{ fontSize: recipe.name.length > 30 ? 17 : 19 }}
              >
                {recipe.name}
              </h1>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginBottom: '24px' }}>
        <Image src={recipe.image} alt="" aspectRatio={1.25} />
      </div>
      <div className="recipe-container__body container">
        <div className="grid columns-1 g-6">
          {recipe.description && <p>{recipe.description}</p>}

          {recipe.steps.map((step) => (
            <SectionCard title={step.name} key={step.ingredients.join('')}>
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
            <div className="grid columns-1 g-3">
              <h3 className="section-title">Vitaminas</h3>

              <ul className="list">
                {Object.values(recipe.vitamins).map(renderNutrient)}
              </ul>
            </div>
          )}

          {hasMinerals && (
            <div className="grid columns-1 g-3">
              <h3 className="section-title">Vitaminas</h3>

              <ul className="list">
                {Object.values(recipe.minerals).map(renderNutrient)}
              </ul>
            </div>
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
