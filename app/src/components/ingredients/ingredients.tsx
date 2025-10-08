import { type FC, useContext } from 'react';
import Image from '../image/image';
import { SemanticButton } from '../semantic-button';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import type { Ingredient } from 'services/ingredient/ingredient.model';
import type { Food } from 'services/food/food.model';
import { Section, type SectionProps } from 'notebook-layout';

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
  const { language } = useContext(LanguageContext);
  function handleClick(ingredient: Ingredient) {
    if (setCurrentFood) {
      setCurrentFood(ingredient.food);
    }

    if (setCurrentFoodQuantity) {
      setCurrentFoodQuantity(ingredient.quantity);
    }
  }

  console.log(ingredients);

  return (
    <Section
      title={translate('ingredientsTitle', language)}
      onBgWhite
      {...props}
    >
      <div className="list">
        {ingredients.map((ingredient) => (
          <SemanticButton
            key={`${ingredient.food.id}-${
              ingredient.quantity
            }-${ingredient.text.replace(/\s/g, '-')}`}
            className="list-item -no-gutters -no-border"
            onClick={() => handleClick(ingredient)}
          >
            <div className="w-100 grid columns-10 align-items-center g-2">
              <div className="g-col-1">
                <Image
                  src={ingredient.food.icon || ingredient.food.image}
                  alt={ingredient.food.name[language]}
                  transparent
                />
              </div>

              <div className="g-col-9">
                <p>{ingredient.text}</p>
              </div>
            </div>
          </SemanticButton>
        ))}
      </div>
    </Section>
  );
};

export default Ingredients;

