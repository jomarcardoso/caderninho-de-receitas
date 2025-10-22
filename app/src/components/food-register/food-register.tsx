import { type FC, useContext, useMemo } from 'react';
import { Formik } from 'formik';
import type { FormikProps } from 'formik';
import { FoodRegisterForm, type FoodForm } from './food-register-form';
import type { Food } from 'services/food/food.model';
import { LanguageContext } from '../../providers/language/language.context';
import { saveFood } from '../../services/food.api';
import { NUTRITIONAL_INFO_FALLBACK, AMINO_ACIDS_FALLBACK, MINERALS_FALLBACK } from 'services/nutrient/fallback';
import type { Nutrient } from 'services/nutrient/nutrient.model';

export interface FoodRegisterProps {
  food: Food;
}

export const FoodRegister: FC<FoodRegisterProps> = ({ food }) => {
  const { language } = useContext(LanguageContext);

  const pickByIndex = (list: Nutrient[] | undefined, index: number | undefined): number | '' => {
    if (!list || typeof index !== 'number') return '';
    const item = list.find(n => n.index === index);
    return typeof item?.quantity === 'number' && !Number.isNaN(item.quantity) ? item.quantity : '';
  };

  function deriveIconName(raw?: string): string {
    const val = raw || '';
    if (!val) return '';
    if (val.startsWith('/')) {
      const base = val.split('/').pop() || '';
      return base.includes('.') ? base : '';
    }
    if (/^https?:/i.test(val)) {
      try {
        const base = new URL(val).pathname.split('/').pop() || '';
        return base.includes('.') ? base : '';
      } catch {
        return '';
      }
    }
    // data: URIs não possuem nome de arquivo
    return '';
  }

  const initialValues = useMemo<FoodForm>(() => ({
    name: food?.name?.[language] || '',
    description: food?.description?.[language] || '',
    icon: ((food as any)?.iconName || deriveIconName(food?.icon)),
    imgs: Array.isArray(food?.imgs) ? food!.imgs : [],
    gi: pickByIndex(food?.nutritionalInformation, NUTRITIONAL_INFO_FALLBACK.Gi?.index),
    calories: pickByIndex(food?.nutritionalInformation, NUTRITIONAL_INFO_FALLBACK.Calories?.index),
    carbohydrates: pickByIndex(food?.nutritionalInformation, NUTRITIONAL_INFO_FALLBACK.Carbohydrates?.index),
    proteins: pickByIndex(food?.nutritionalInformation, NUTRITIONAL_INFO_FALLBACK.Proteins?.index),
    totalFat: pickByIndex(food?.nutritionalInformation, NUTRITIONAL_INFO_FALLBACK.TotalFat?.index),
    saturedFats: pickByIndex(food?.nutritionalInformation, NUTRITIONAL_INFO_FALLBACK.SaturedFats?.index),
    tryptophan: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Tryptophan?.index),
    phenylalanine: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Phenylalanine?.index),
    leucine: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Leucine?.index),
    valine: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Valine?.index),
    isoleucine: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Isoleucine?.index),
    lysine: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Lysine?.index),
    threonine: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Threonine?.index),
    methionine: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Methionine?.index),
    histidine: pickByIndex(food?.aminoAcids, AMINO_ACIDS_FALLBACK.Histidine?.index),
    calcium: pickByIndex(food?.minerals, MINERALS_FALLBACK.Calcium?.index),
    copper: pickByIndex(food?.minerals, MINERALS_FALLBACK.Copper?.index),
    iron: pickByIndex(food?.minerals, MINERALS_FALLBACK.Iron?.index),
    manganese: pickByIndex(food?.minerals, MINERALS_FALLBACK.Manganese?.index),
    magnesium: pickByIndex(food?.minerals, MINERALS_FALLBACK.Magnesium?.index),
    phosphorus: pickByIndex(food?.minerals, MINERALS_FALLBACK.Phosphorus?.index),
    sodium: pickByIndex(food?.minerals, MINERALS_FALLBACK.Sodium?.index),
    potassium: pickByIndex(food?.minerals, MINERALS_FALLBACK.Potassium?.index),
    zinc: pickByIndex(food?.minerals, MINERALS_FALLBACK.Zinc?.index),
    fluoride: pickByIndex(food?.minerals, MINERALS_FALLBACK.Fluoride?.index),
    selenium: pickByIndex(food?.minerals, MINERALS_FALLBACK.Selenium?.index),
  }), [food, language]);

  return (
    <Formik<FoodForm>
      initialValues={initialValues}
      onSubmit={async (values, helpers) => {
        try {
          await saveFood(values, food?.id || 0, language);
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {(formik: FormikProps<FoodForm>) => (
        <FoodRegisterForm
          food={food}
          {...formik}
        />
      )}
    </Formik>
  );
};






