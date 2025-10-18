import { type FC, useContext, useEffect } from 'react';
import { StickyHeader } from 'ovos';
import Image from '../image/image';
import { AminoAcidsTable, type AminoAcidsTableProps } from '../aminoacids-table/aminoacids-table';
import Ingredients from '../ingredients/ingredients';
import Preparation from '../preparation/preparation';
import NutrientDisplay from '../nutrient/nutrient';
import './recipe-container.scss';
import { ListItem } from '../list-item/list-item';
import type { Food } from 'services/food/food.model';
import { type Recipe } from 'services/recipe/recipe.model';
import { LanguageContext } from '../../providers/language/language.context';
import { SectionCard } from 'notebook-layout';
import RecipeDetails from '@common/components/recipe/RecipeDetails';

const AminoAcidsTableLight = (props: AminoAcidsTableProps) => (
  <AminoAcidsTable contrast="light" {...props} />
);

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
          srcs={[
            ...(recipe?.imgs ?? []),
            ...(recipe?.food?.imgs ?? []),
          ]}
          alt=""
          aspectRatio={1.25}
        />
      </div>
      <div className="recipe-container__body container">
        <RecipeDetails
          recipe={recipe}
          language={language}
          nutrientSectionsWithCards={false}
          setCurrentFood={setCurrentFood}
          setCurrentFoodQuantity={setCurrentFoodQuantity}
          components={{
            Ingredients,
            Preparation,
            NutrientDisplay,
            ListItem,
            AminoAcidsTable: AminoAcidsTableLight,
            SectionCard,
          }}
        />
      </div>
    </div>
  );
};

export default RecipeContainer;

