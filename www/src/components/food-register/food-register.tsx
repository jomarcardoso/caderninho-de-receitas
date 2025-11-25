'use client';
import type { FC } from 'react';
import { Formik, type FormikHelpers, type FormikProps } from 'formik';
import type { Food } from '@common/services/food/food.model';
import { useContext, useMemo } from 'react';
import { LanguageContext } from '@/contexts/language/language.context';
import {
  AMINO_ACIDS_FALLBACK,
  MINERALS_FALLBACK,
  NUTRITIONAL_INFO_FALLBACK,
} from 'services/nutrient/fallback';
import type { Nutrient } from 'services/nutrient/nutrient.model';
import { submitFoodEdit } from '@/services/edits.api';
import { FoodRegisterForm, type FoodForm } from './food-register-form';

export interface FoodRegisterProps {
  food?: Food | null;
}

const FoodRegister: FC<FoodRegisterProps> = ({ food }) => {
  const { language } = useContext(LanguageContext);

  const pickByIndex = (
    list: Nutrient[] | undefined,
    index: number | undefined,
  ): number | '' => {
    if (!list || typeof index !== 'number') return '';
    const item = list.find((n) => n.index === index);
    return typeof item?.quantity === 'number' && !Number.isNaN(item.quantity)
      ? item.quantity
      : '';
  };

  const deriveIconName = (raw?: string) => {
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
    return '';
  };

  const initialValues = useMemo<FoodForm>(() => {
    const safeFood = food ?? ({} as Food);
    return {
      namePt: safeFood?.name?.pt || '',
      nameEn: safeFood?.name?.en || '',
      descriptionPt: safeFood?.description?.pt || '',
      descriptionEn: safeFood?.description?.en || '',
      keysPt: (safeFood as any)?.keys?.pt || '',
      keysEn: (safeFood as any)?.keys?.en || '',
      icon:
        ((safeFood as any)?.iconName as string) ||
        deriveIconName((((safeFood as any)?.icon?.[0] as string) || '') ?? ''),
      imgs: Array.isArray(safeFood?.imgs) ? safeFood!.imgs : [],
      gi: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.Gi?.index,
      ),
      calories: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.Calories?.index,
      ),
      carbohydrates: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.Carbohydrates?.index,
      ),
      proteins: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.Proteins?.index,
      ),
      totalFat: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.TotalFat?.index,
      ),
      saturedFats: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.SaturedFats?.index,
      ),
      dietaryFiber: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.DietaryFiber?.index,
      ),
      sugar: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.Sugar?.index,
      ),
      monounsaturatedFats: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.MonounsaturatedFats?.index,
      ),
      polyunsaturatedFats: pickByIndex(
        safeFood?.nutritionalInformation,
        NUTRITIONAL_INFO_FALLBACK.PolyunsaturatedFats?.index,
      ),
      tryptophan: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Tryptophan?.index,
      ),
      phenylalanine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Phenylalanine?.index,
      ),
      leucine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Leucine?.index,
      ),
      valine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Valine?.index,
      ),
      isoleucine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Isoleucine?.index,
      ),
      lysine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Lysine?.index,
      ),
      threonine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Threonine?.index,
      ),
      methionine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Methionine?.index,
      ),
      histidine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Histidine?.index,
      ),
      alanine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Alanine?.index,
      ),
      arginine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Arginine?.index,
      ),
      asparticAcid: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.AsparticAcid?.index,
      ),
      cystine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Cystine?.index,
      ),
      glutamicAcid: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.GlutamicAcid?.index,
      ),
      glutamine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Glutamine?.index,
      ),
      glycine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Glycine?.index,
      ),
      proline: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Proline?.index,
      ),
      serine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Serine?.index,
      ),
      tyrosine: pickByIndex(
        safeFood?.aminoAcids,
        AMINO_ACIDS_FALLBACK.Tyrosine?.index,
      ),
      calcium: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Calcium?.index,
      ),
      copper: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Copper?.index,
      ),
      iron: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Iron?.index,
      ),
      manganese: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Manganese?.index,
      ),
      magnesium: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Magnesium?.index,
      ),
      phosphorus: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Phosphorus?.index,
      ),
      sodium: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Sodium?.index,
      ),
      potassium: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Potassium?.index,
      ),
      zinc: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Zinc?.index,
      ),
      fluoride: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Fluoride?.index,
      ),
      selenium: pickByIndex(
        safeFood?.minerals,
        MINERALS_FALLBACK.Selenium?.index,
      ),
    };
  }, [food, language]);

  if (!food) {
    return <p>Selecione um alimento para editar.</p>;
  }

  return (
    <Formik<FoodForm>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (
        values,
        helpers: FormikHelpers<FoodForm>,
      ): Promise<void> => {
        try {
          const ok = await submitFoodEdit(food?.id || 0, values, language);
          alert(
            ok
              ? 'Edicao enviada para aprovacao.'
              : 'Nao foi possivel enviar a edicao.',
          );
        } finally {
          helpers.setSubmitting(false);
        }
      }}
    >
      {(formik: FormikProps<FoodForm>) => (
        <FoodRegisterForm food={food} {...formik} />
      )}
    </Formik>
  );
};

export default FoodRegister;
