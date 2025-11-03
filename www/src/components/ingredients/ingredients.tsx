import { type FC } from 'react';
import { Image2 } from '../image-2/image';
import { Language } from '@/contexts/language';
import { translate } from '@common/services/language/language.service';
import type { Ingredient } from 'services/ingredient/ingredient.model';
import type { Food } from 'services/food/food.model';
import { Section, type SectionProps } from 'notebook-layout';

interface Props {
  ingredients: Array<Ingredient>;
  setCurrentFood?: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

export type IngredientsProps = Props & SectionProps;

export const Ingredients: FC<IngredientsProps> = ({
  ingredients = [],
  setCurrentFood,
  setCurrentFoodQuantity,
  ...props
}) => {
  const language: Language = 'pt';

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
      <div className="list">
        {ingredients.map((ingredient) => (
          <button
            key={`${ingredient.food.id}-${
              ingredient.quantity
            }-${ingredient.text.replace(/\s/g, '-')}`}
            className="list-item -no-gutters -no-border"
            onClick={() => handleClick(ingredient)}
          >
            <div className="w-100 grid columns-10 align-items-center g-2">
              <div className="g-col-1">
                <Image2
                  srcs={[
                    ...(((ingredient.food as any).icon as string[]) ?? []),
                    ...((ingredient.food.imgs ?? []) as string[]),
                  ]}
                  alt={ingredient.food.name[language]}
                  transparent
                />
              </div>

              <div className="g-col-9">
                <p>{ingredient.text}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
};
"use client";
