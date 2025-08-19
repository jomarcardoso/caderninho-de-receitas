import React, { FC, HTMLProps, useCallback } from 'react';
import { Food, FoodData } from '../../services/food';
import Field from '../field/field';
import { FormikProps } from 'formik';
import { Vitamin, VITAMINS } from '../../services/vitamin';

export interface FoodRegisterFormProps {
  food: Food;
}

export const FoodRegisterForm: FC<
  FormikProps<FoodData> & FoodRegisterFormProps
> = ({ values, handleChange, handleBlur }) => {
  const renderInput = useCallback(
    (
      label = '',
      name: keyof FoodData = 'name',
      breakline = false,
      multiline = false,
      type: HTMLProps<HTMLInputElement>['type'] = 'number',
    ) => (
      <Field
        multiline={multiline}
        breakline={breakline}
        minRows={multiline ? 2 : undefined}
        label={label}
        name={name}
        value={values[name] as string}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    ),
    [values],
  );

  return (
    <div>
      {renderInput('nome do alimento', 'name', true)}
      {renderInput('descrição', 'description', true, true)}
      {renderInput('índice glicêmico', 'gi')}
      {renderInput('calorias', 'calories')}
      {renderInput('carboidratos', 'carbohydrates')}
      {renderInput('proteínas', 'proteins')}
      {renderInput('gorduras totais', 'totalFat')}
      {renderInput('gordura saturada', 'saturedFats')}

      {renderInput('triptofano', 'tryptophan')}
      {renderInput('fenilanina', 'phenylalanine')}
      {renderInput('leucina', 'leucine')}
      {renderInput('valina', 'valine')}
      {renderInput('isoleucina', 'isoleucine')}
      {renderInput('lisina', 'lysine')}
      {renderInput('treonina', 'threonine')}
      {renderInput('metionina', 'methionine')}
      {renderInput('histidina', 'histidine')}

      {Object.entries(VITAMINS).map(([key, vitamin]) =>
        renderInput(vitamin.name, key as keyof FoodData),
      )}

      {renderInput('calcium', 'calcium')}
      {renderInput('cobre', 'copper')}
      {renderInput('ferro', 'iron')}
      {renderInput('manganês', 'manganese')}
      {renderInput('magnésio', 'magnesium')}
      {renderInput('fósforo', 'phosphorus')}
      {renderInput('sódio', 'sodium')}
      {renderInput('potássio', 'potassium')}
      {renderInput('zinco', 'zinc')}
      {renderInput('flúor', 'fluoride')}
      {renderInput('selênio', 'selenium')}
    </div>
  );
};
