import React, { FC, HTMLProps, useCallback, useContext } from 'react';
import Field from '../field/field';
import { FormikProps } from 'formik';
import { Food } from '../../services/food/food.model';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from '../../services/language/language.service';

export interface FoodRegisterFormProps {
  food: Food;
}

export const FoodRegisterForm: FC<
  FormikProps<FoodDto> & FoodRegisterFormProps
> = ({ values, handleChange, handleBlur }) => {
  const { language } = useContext(LanguageContext);

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
    [handleBlur, handleChange, values],
  );

  return (
    <div>
      {renderInput(translate('foodFormFoodName', language), 'name', true)}
      {renderInput(translate('descriptionLabel', language), 'description', true, true)}
      {renderInput(translate('foodFormGlycemicIndex', language), 'gi')}
      {renderInput(translate('foodFormCalories', language), 'calories')}
      {renderInput(translate('foodFormCarbohydrates', language), 'carbohydrates')}
      {renderInput(translate('foodFormProteins', language), 'proteins')}
      {renderInput(translate('foodFormTotalFat', language), 'totalFat')}
      {renderInput(translate('foodFormSaturatedFat', language), 'saturedFats')}

      {renderInput(translate('foodFormTryptophan', language), 'tryptophan')}
      {renderInput(translate('foodFormPhenylalanine', language), 'phenylalanine')}
      {renderInput(translate('foodFormLeucine', language), 'leucine')}
      {renderInput(translate('foodFormValine', language), 'valine')}
      {renderInput(translate('foodFormIsoleucine', language), 'isoleucine')}
      {renderInput(translate('foodFormLysine', language), 'lysine')}
      {renderInput(translate('foodFormThreonine', language), 'threonine')}
      {renderInput(translate('foodFormMethionine', language), 'methionine')}
      {renderInput(translate('foodFormHistidine', language), 'histidine')}

      {Object.entries(VITAMINS).map(([key, vitamin]) =>
        renderInput(vitamin.name, key as keyof FoodData),
      )}

      {renderInput(translate('foodFormCalcium', language), 'calcium')}
      {renderInput(translate('foodFormCopper', language), 'copper')}
      {renderInput(translate('foodFormIron', language), 'iron')}
      {renderInput(translate('foodFormManganese', language), 'manganese')}
      {renderInput(translate('foodFormMagnesium', language), 'magnesium')}
      {renderInput(translate('foodFormPhosphorus', language), 'phosphorus')}
      {renderInput(translate('foodFormSodium', language), 'sodium')}
      {renderInput(translate('foodFormPotassium', language), 'potassium')}
      {renderInput(translate('foodFormZinc', language), 'zinc')}
      {renderInput(translate('foodFormFluoride', language), 'fluoride')}
      {renderInput(translate('foodFormSelenium', language), 'selenium')}
    </div>
  );
};
