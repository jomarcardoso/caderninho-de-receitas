import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useContext,
  useMemo,
} from 'react';
import Field, { FieldProps } from '../field/field';
import './interactive-field.scss';
import Image from '../image/image';
import IngredientService from '../../services/ingredient/ingredient.service';
import { FoodsContext } from '../../providers';

export const InteractiveField: FC<FieldProps> = ({ ...props }) => {
  const foods = useContext(FoodsContext);
  const { value } = props;

  console.log(String(value).split('\n'));

  const ingredients = String(value)
    .split('\n')
    .map((text) =>
      IngredientService.ingredientFromString({
        text,
        foods,
      }),
    );

  return (
    <div className="interactive-field">
      <div className="interactive-field__foods">
        {ingredients.map(
          (ingredient) =>
            ingredient.food.name && (
              <Image
                src={ingredient.food.icon || ingredient.food.image}
                alt={ingredient.food.name}
                transparent
                className="interactive-field__img"
              />
            ),
        )}
      </div>
      <Field size="large" multiline minRows="4" {...props} />
    </div>
  );
};
