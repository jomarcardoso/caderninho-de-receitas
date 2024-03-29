import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { StickyHeader } from 'ovos';
import Image from '../image/image';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import { RECIPE, Recipe, RecipeService } from '../../services/recipe';
import { Food } from '../../services/food';
import SectionCard from '../section-card/section-card';
import { AminoAcidService } from '../../services/amino-acid';
import NutrientDisplay from '../nutrient/nutrient';
import './recipe-container.scss';
import { Nutrient } from '../../services/nutrient.constants';
import { ListItem } from '../list-item/list-item';
import FoodsContext from '../../contexts/foods-context';

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
  const foods = useContext(FoodsContext);
  const formattedRecipe = useMemo(() => {
    return RecipeService.format({
      foods,
      recipe,
    });
  }, [recipe]);

  const hasVitamins = useMemo(
    () =>
      Object.values(formattedRecipe.vitamins).some(
        (vitamin) => vitamin.quantity,
      ),
    [formattedRecipe],
  );

  const hasMinerals = useMemo(
    () =>
      Object.values(formattedRecipe.minerals).some(
        (mineral) => mineral.quantity,
      ),
    [formattedRecipe],
  );

  const renderNutrient = useCallback(
    (nutrient: Nutrient): ReactElement | null => {
      if (!nutrient.quantity) return null;

      return (
        <ListItem noGutters noBorder key={nutrient.name}>
          <NutrientDisplay nutrient={nutrient} />
        </ListItem>
      );
    },
    [],
  );

  const renderQuality = useCallback(({ name: foodName = '', value = 0 }) => {
    if (!value) return null;

    return (
      <ListItem noGutters noBorder>
        <div className="w-100 d-flex gap-1 justify-content-between">
          <div>{foodName}</div>

          <div>{value.toFixed(2)}</div>
        </div>
      </ListItem>
    );
  }, []);

  useEffect(() => {
    StickyHeader({});
  }, []);

  return (
    <div className="recipe-container">
      {formattedRecipe.name && (
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
                style={{ fontSize: formattedRecipe.name.length > 30 ? 17 : 19 }}
              >
                {formattedRecipe.name}
              </h1>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginBottom: '24px' }}>
        <Image src={formattedRecipe.image} alt="" aspectRatio={1.25} />
      </div>
      <div className="recipe-container__body container">
        <div className="grid columns-1 g-6">
          {formattedRecipe.description && <p>{formattedRecipe.description}</p>}

          {formattedRecipe.steps.map((step) => (
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

          {formattedRecipe.additional && (
            <div>{formattedRecipe.additional}</div>
          )}

          <div className="grid columns-1 g-3">
            <h2 className="h2">Informações nutricionais</h2>

            <ul>
              {renderQuality({
                name: 'Calorias',
                value: formattedRecipe.calories,
              })}
              {renderQuality({
                name: 'Carboidratos',
                value: formattedRecipe.carbohydrates,
              })}
              {renderQuality({
                name: 'Proteínas',
                value: formattedRecipe.proteins,
              })}
              {renderQuality({
                name: 'Gorduras totais',
                value: formattedRecipe.totalFat,
              })}
              {renderQuality({
                name: 'Fibras',
                value: formattedRecipe.dietaryFiber,
              })}
            </ul>
          </div>

          {hasVitamins && (
            <div className="grid columns-1 g-3">
              <h3 className="section-title">Vitaminas</h3>

              <ul className="list">
                {Object.values(formattedRecipe.vitamins).map(renderNutrient)}
              </ul>
            </div>
          )}

          {hasMinerals && (
            <div className="grid columns-1 g-3">
              <h3 className="section-title">Vitaminas</h3>

              <ul className="list">
                {Object.values(formattedRecipe.minerals).map(renderNutrient)}
              </ul>
            </div>
          )}

          {AminoAcidService.verifyHasAminoAcid(formattedRecipe.aminoAcids) && (
            <AminoAcidsTable
              contrast="light"
              aminoAcids={formattedRecipe.aminoAcids}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeContainer;
