import React, {
  FC,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { StickyHeader } from 'ovos';
import Image from '../image/image';
import AminoAcidsTable from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import SectionCard from '../section-card/section-card';
import NutrientDisplay from '../nutrient/nutrient';
import './recipe-container.scss';
import { ListItem } from '../list-item/list-item';
import { Food } from '../../services/food/food.model';
import { Recipe } from '../../services/recipe/recipe.model';
import { Nutrient } from '../../services/nutrient/nutrient.model';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';
import { formatNumber, roundToMaximumDecimals } from '../../services/number';

export interface RecipeContainerProps {
  recipe?: Recipe;
  setCurrentFood?(food: Food): void;
  setCurrentFoodQuantity?(quantity: number): void;
}

const RecipeContainer: FC<RecipeContainerProps> = ({
  recipe,
  setCurrentFood,
  setCurrentFoodQuantity,
}) => {
  const { language } = useContext(LanguageContext);

  const renderNutrient = useCallback(
    (nutrient: Nutrient): ReactElement | null => {
      if (!nutrient.quantity) return null;

      return (
        <ListItem noGutters noBorder key={nutrient.name.en}>
          <NutrientDisplay nutrient={nutrient} />
        </ListItem>
      );
    },
    [],
  );

  const renderNutritionalInformation = useCallback(
    ({ name, quantity, measurementUnit }: Nutrient) => {
      if (!quantity) return null;

      const roundedQuantity = roundToMaximumDecimals(quantity);
      const formattedQuantity = formatNumber(
        roundedQuantity ?? quantity,
        language,
      );

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
    },
    [],
  );

  useEffect(() => {
    StickyHeader({});
  }, []);

  return (
    <div className="recipe-container">
      {recipe?.name && (
        <div
          data-ovo-sticky-header
          style={{
            position: 'sticky',
            top: 0,
            right: 0,
            width: '100%',
            zIndex: 1,
          }}
        >
          <div className="recipe-container__name">
            <div className="container">
              <h1
                className="h2"
                style={{
                  fontSize: recipe.name.length > 30 ? 17 : 19,
                }}
              >
                {recipe.name}
              </h1>
            </div>
          </div>
        </div>
      )}
      <div style={{ marginBottom: '24px' }}>
        <Image
          src={recipe?.image || recipe?.food.image}
          alt=""
          aspectRatio={1.25}
        />
      </div>
      <div className="recipe-container__body container">
        <div className="grid columns-1 g-6">
          {recipe?.description && <p>{recipe.description}</p>}

          {recipe?.steps.map((step) => (
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

          <div className="grid columns-1 g-3">
            <h2 className="h2">
              {translate('nutritionalInformation', language)}
            </h2>

            <ul>
              {recipe?.nutritionalInformation?.map(
                renderNutritionalInformation,
              )}
            </ul>
          </div>

          {recipe?.vitamins?.length && (
            <div className="grid columns-1 g-3">
              <h3 className="section-title">
                {translate('vitamins', language)}
              </h3>

              <ul className="list">{recipe?.vitamins.map(renderNutrient)}</ul>
            </div>
          )}

          {recipe?.minerals?.length && (
            <div className="grid columns-1 g-3">
              <h3 className="section-title">
                {translate('minerals', language)}
              </h3>

              <ul className="list">{recipe?.minerals.map(renderNutrient)}</ul>
            </div>
          )}

          {recipe?.aminoAcids?.length && recipe?.aminoAcids && (
            <AminoAcidsTable
              contrast="light"
              essentialAminoAcids={recipe.aminoAcids}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeContainer;
