import React, { FC } from 'react';
import Field, { FieldProps } from '../field/field';
import './interactive-field.scss';
import Image from '../image/image';
import { ShoppingListService } from '../../providers/shopping-list/shopping-list.service';
import { Checkbox } from '../checkbox';

export const InteractiveField: FC<FieldProps> = ({ ...props }) => {
  const { value } = props;
  const lines = ShoppingListService.process(String(value));

  return (
    <div className="interactive-field">
      <div className="interactive-field__foods">
        {lines.map(
          (line) =>
            line.food.name && (
              <Image
                src={line.food.icon || line.food.image}
                alt={line.food.name}
                transparent
                className="interactive-field__img"
              />
            ),
        )}
      </div>

      <Field size="large" multiline minRows="4" {...props} />

      <div className="interactive-field__checks">
        {lines.map((line) => line.food.name && <Checkbox />)}
      </div>
    </div>
  );
};
