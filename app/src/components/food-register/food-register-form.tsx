import { type FC, type HTMLProps, useCallback, useContext } from 'react';
import { Form } from 'formik';
import type { FormikProps } from 'formik';
import type { Food } from 'services/food/food.model';
import { LanguageContext } from '../../providers/language/language.context';
import { translate } from 'services/language/language.service';
import { Field } from 'notebook-layout';
import SubmitComponent from '../submit';

export interface FoodRegisterFormProps { food: Food }

// Campos simples e achatados para ediço/salvamento
export interface FoodForm {
  name: string;
  description: string;
  gi: number | '';
  calories: number | '';
  carbohydrates: number | '';
  proteins: number | '';
  totalFat: number | '';
  saturedFats: number | '';
  // Amino acids (subset já presente no formulário antigo)
  tryptophan: number | '';
  phenylalanine: number | '';
  leucine: number | '';
  valine: number | '';
  isoleucine: number | '';
  lysine: number | '';
  threonine: number | '';
  methionine: number | '';
  histidine: number | '';
  // Minerals (conforme labels já existentes)
  calcium: number | '';
  copper: number | '';
  iron: number | '';
  manganese: number | '';
  magnesium: number | '';
  phosphorus: number | '';
  sodium: number | '';
  potassium: number | '';
  zinc: number | '';
  fluoride: number | '';
  selenium: number | '';
}

export const FoodRegisterForm: FC<FormikProps<FoodForm> & FoodRegisterFormProps> = ({ values, handleChange, handleBlur }) => {
  const { language } = useContext(LanguageContext);

  const renderInput = useCallback(
    (
      label = '',
      name: keyof FoodForm = 'name',
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
        value={(values as any)[name] as any}
        onChange={handleChange}
        onBlur={handleBlur}
        type={type}
      />
    ),
    [handleBlur, handleChange, values],
  );

  return (
    <Form>
      <div className="container" style={{ display: 'grid', gap: 12 }}>
        {renderInput(translate('foodFormFoodName', language), 'name', false, false, 'text')}
        {renderInput(
          translate('descriptionLabel', language),
          'description',
          true,
          true,
        )}
        {renderInput(translate('foodFormGlycemicIndex', language), 'gi')}
        {renderInput(translate('foodFormCalories', language), 'calories')}
        {renderInput(
          translate('foodFormCarbohydrates', language),
          'carbohydrates',
        )}
        {renderInput(translate('foodFormProteins', language), 'proteins')}
        {renderInput(translate('foodFormTotalFat', language), 'totalFat')}
        {renderInput(translate('foodFormSaturatedFat', language), 'saturedFats')}

        {renderInput(translate('foodFormTryptophan', language), 'tryptophan')}
        {renderInput(
          translate('foodFormPhenylalanine', language),
          'phenylalanine',
        )}
        {renderInput(translate('foodFormLeucine', language), 'leucine')}
        {renderInput(translate('foodFormValine', language), 'valine')}
        {renderInput(translate('foodFormIsoleucine', language), 'isoleucine')}
        {renderInput(translate('foodFormLysine', language), 'lysine')}
        {renderInput(translate('foodFormThreonine', language), 'threonine')}
        {renderInput(translate('foodFormMethionine', language), 'methionine')}
        {renderInput(translate('foodFormHistidine', language), 'histidine')}

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

        <div style={{ marginTop: 12 }}>
          <SubmitComponent>
            {translate('save', language) || 'Salvar'}
          </SubmitComponent>
        </div>
      </div>
    </Form>
  );
};

