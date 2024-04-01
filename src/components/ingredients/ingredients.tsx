import React, { FC } from 'react';
import Image from '../image/image';
import { Ingredient } from '../../services/ingredient/ingredient.types';
import { Food } from '../../services/food';
import Section, { SectionProps } from '../section/section';
import { SemanticButton } from '../semantic-button';

interface Props {
  ingredients: Array<Ingredient>;
  setCurrentFood?: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity?: React.Dispatch<React.SetStateAction<number>>;
}

export type IngredientsProps = Props & SectionProps;

const Ingredients: FC<IngredientsProps> = ({
  ingredients = [],
  setCurrentFood,
  setCurrentFoodQuantity,
  ...props
}) => {
  function handleClick(ingredient: Ingredient) {
    if (setCurrentFood) {
      setCurrentFood(ingredient.food);
    }

    if (setCurrentFoodQuantity) {
      setCurrentFoodQuantity(ingredient.quantity);
    }
  }

  return (
    <Section title="Ingredientes" onBgWhite {...props}>
      <div className="list">
        {ingredients.map((ingredient) => (
          <SemanticButton
            key={`${ingredient.food.id}-${
              ingredient.quantity
            }-${ingredient.description.replace(/\s/g, '-')}`}
            className="list-item -no-gutters -no-border"
            onClick={() => handleClick(ingredient)}
          >
            <div className="w-100 grid columns-10 align-items-center g-2">
              <div className="g-col-1">
                <Image
                  src={ingredient.food.icon || ingredient.food.image}
                  alt={ingredient.food.name}
                  transparent
                />
              </div>

              <div className="g-col-9">
                <p>{ingredient.description}</p>
              </div>
            </div>
          </SemanticButton>
        ))}
      </div>
    </Section>
  );
};

export default Ingredients;
