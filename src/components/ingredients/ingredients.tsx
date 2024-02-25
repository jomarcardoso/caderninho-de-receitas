import React, { FC } from 'react';
import Image from '../image/image';
import { Ingredient } from '../../services/ingredient/ingredient.types';
import { Food } from '../../services/food';
import Section, { SectionProps } from '../section/section';
import { SemanticButton } from '../semantic-button';

interface Props {
  ingredients: Array<Ingredient>;
  setCurrentFood: React.Dispatch<React.SetStateAction<Food>>;
  setCurrentFoodQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export type IngredientsProps = Props & SectionProps;

const Ingredients: FC<IngredientsProps> = ({
  ingredients = [],
  setCurrentFood,
  setCurrentFoodQuantity,
  ...props
}) => {
  function handleClick(ingredient: Ingredient) {
    setCurrentFood(ingredient.food);
    setCurrentFoodQuantity(ingredient.quantity);
  }

  return (
    <Section title="Ingredientes" onBgWhite {...props}>
      <ul className="list">
        {ingredients.map((ingredient) => (
          <li
            key={`${ingredient.food.id}-${
              ingredient.quantity
            }-${ingredient.description.replace(/\s/g, '-')}`}
          >
            <SemanticButton
              className="list-item -no-gutter"
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
          </li>
        ))}
      </ul>
    </Section>
  );
};

export default Ingredients;
