"use client";

import { useLanguage } from '@/contexts/language';
import type { Recipe } from '@common/services/recipe/recipe.model';
import type { Food } from '@common/services/food/food.model';
import type { Nutrient } from '@common/services/nutrient/nutrient.model';
import type { RecipeStep } from '@common/services/recipe-step';
import { RecipeDetails } from '@common/components';
import { translate } from '@common/services/language/language.service';
import { SectionCard, Section } from 'notebook-layout';

type IngredientsProps = {
  ingredients: RecipeStep['ingredients'];
  setCurrentFood?: (food: Food) => void;
  setCurrentFoodQuantity?: (quantity: number) => void;
};

const Ingredients = ({
  ingredients,
  setCurrentFood,
  setCurrentFoodQuantity,
}: IngredientsProps) => {
  const { language } = useLanguage();

  const handleClick = (ing: RecipeStep['ingredients'][number]) => {
    if (setCurrentFood) setCurrentFood(ing.food);
    if (setCurrentFoodQuantity) setCurrentFoodQuantity(ing.quantity);
  };

  return (
    <Section onBgWhite title={translate('ingredientsTitle', language)}>
      <ul className="list">
        {ingredients.map((ing) => (
          <li
            key={`${ing.food.id}-${ing.quantity}-${ing.text.replace(/\s/g, '-')}`}
            onClick={() => handleClick(ing)}
            style={{ cursor: setCurrentFood || setCurrentFoodQuantity ? 'pointer' : 'default' }}
          >
            {ing.text}
          </li>
        ))}
      </ul>
    </Section>
  );
};

const Preparation = ({ preparation, title }: { preparation: string; title?: string }) => (
  <div>
    {title !== undefined && title !== '' && <h4 className="section-title">{title}</h4>}
    <p>{preparation}</p>
  </div>
);

const NutrientDisplay = ({ nutrient }: { nutrient: Nutrient }) => (
  <span>
    {nutrient.name.en}: {nutrient.quantity}
    {nutrient.measurementUnit}
  </span>
);

const ListItem = ({ children }: { children: React.ReactNode }) => <li>{children}</li>;

const AminoAcidsTable = ({ essentialAminoAcids }: { contrast?: 'light' | 'dark'; essentialAminoAcids: Nutrient[] }) => (
  <ul className="list">
    {essentialAminoAcids.map((a, idx) => (
      <li key={idx}>
        {a.name.en}: {a.quantity}
        {a.measurementUnit}
      </li>
    ))}
  </ul>
);

export default function ClientRecipeDetails({ recipe }: { recipe: Recipe }) {
  const { language } = useLanguage();

  return (
    <RecipeDetails
      recipe={recipe}
      language={language}
      components={{
        Ingredients,
        Preparation,
        NutrientDisplay,
        ListItem,
        AminoAcidsTable,
        SectionCard,
      }}
    />
  );
}
