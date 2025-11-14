import { translate } from 'services/language/language.service';
import type { Ingredient } from 'services/ingredient/ingredient.model';
import type { Food } from 'services/food/food.model';
import { Section, type SectionProps } from 'notebook-layout';
import { Language } from '@/contexts/language';
import IngredientsList from './ingredientsList.client';

interface Props {
  ingredients: Array<Ingredient>;
  setCurrentFood?: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

export type IngredientsProps = Props & SectionProps;

export function Ingredients({
  ingredients = [],
  setCurrentFood,
  setCurrentFoodQuantity,
  ...props
}: IngredientsProps) {
  const language: Language = 'pt';
  // icon fetching removed
  function handleClick(ingredient: Ingredient) {
    if (setCurrentFood) {
      setCurrentFood(ingredient.food);
    }

    if (setCurrentFoodQuantity) {
      setCurrentFoodQuantity(ingredient.quantity);
    }
  }

  return (
    <Section
      title={translate('ingredientsTitle', language)}
      onBgWhite
      {...props}
    >
      <IngredientsList
        language={language}
        ingredients={ingredients}
        setCurrentFood={setCurrentFood}
        setCurrentFoodQuantity={setCurrentFoodQuantity}
      />
    </Section>
  );
}
