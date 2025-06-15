import React, { FC, useCallback } from 'react';
import { Food } from '../../services/food';
import Field from '../field/field';
import { FormikProps } from 'formik';

export interface FoodRegisterFormProps {
  food: Food;
}

export const FoodRegisterForm: FC<
  FormikProps<Food> & FoodRegisterFormProps
> = ({ values, handleChange, handleBlur }) => {
  const renderInput = useCallback(
    (label = '', name: keyof Food = 'name') => (
      <Field
        label={label}
        name={name}
        value={values[name] as string}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    ),
    [values],
  );

  return (
    <div>
      {renderInput('nome do alimento', 'name')}

      <Field
        multiline
        label="descrição"
        name="description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        minRows={2}
      />

      {renderInput('índice glicêmico', 'gi')}
      {renderInput('calorias', 'calories')}
    </div>
  );
};
