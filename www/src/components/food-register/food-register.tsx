'use client';
import type { FC } from 'react';
import { Formik, type FormikHelpers, type FormikProps } from 'formik';
import type { Food } from '@common/services/food/food.model';
import { useContext, useMemo, useState } from 'react';
import { LanguageContext } from '@/contexts/language/language.context';
import {
  AMINO_ACIDS_FALLBACK,
  MINERALS_FALLBACK,
  NUTRITIONAL_INFO_FALLBACK,
} from 'services/nutrient/fallback';
import type { Nutrient } from 'services/nutrient/nutrient.model';
import {
  submitFoodEdit,
  submitFoodDeletion,
} from '@/services/edits.api';
import { FoodRegisterForm, type FoodForm } from './food-register-form';

export interface FoodRegisterProps {
  food?: Food | null;
  hideActions?: boolean;
  formId?: string;
}

const FoodRegister: FC<FoodRegisterProps> = ({ food, hideActions, formId }) => {
  const { language } = useContext(LanguageContext);
  const [deleting, setDeleting] = useState(false);

  const pickByIndex = (
    list: Nutrient[] | undefined,
    index: number | undefined,
  ): number | '' => {
    if (!Array.isArray(list) || typeof index !== 'number') return '';
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
    const safeNutritional = Array.isArray(safeFood?.nutritionalInformation)
      ? safeFood.nutritionalInformation
      : [];
    const safeMinerals = Array.isArray(safeFood?.minerals)
      ? safeFood.minerals
      : [];
    const safeAminoAcids = Array.isArray(safeFood?.aminoAcids)
      ? safeFood.aminoAcids
      : [];
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
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.Gi?.index,
      ),
      calories: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.Calories?.index,
      ),
      carbohydrates: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.Carbohydrates?.index,
      ),
      proteins: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.Proteins?.index,
      ),
      totalFat: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.TotalFat?.index,
      ),
      saturedFats: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.SaturedFats?.index,
      ),
      dietaryFiber: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.DietaryFiber?.index,
      ),
      sugar: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.Sugar?.index,
      ),
      monounsaturatedFats: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.MonounsaturatedFats?.index,
      ),
      polyunsaturatedFats: pickByIndex(
        safeNutritional,
        NUTRITIONAL_INFO_FALLBACK.PolyunsaturatedFats?.index,
      ),
      tryptophan: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Tryptophan?.index,
      ),
      phenylalanine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Phenylalanine?.index,
      ),
      leucine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Leucine?.index,
      ),
      valine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Valine?.index,
      ),
      isoleucine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Isoleucine?.index,
      ),
      lysine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Lysine?.index,
      ),
      threonine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Threonine?.index,
      ),
      methionine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Methionine?.index,
      ),
      histidine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Histidine?.index,
      ),
      alanine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Alanine?.index,
      ),
      arginine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Arginine?.index,
      ),
      asparticAcid: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.AsparticAcid?.index,
      ),
      cystine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Cystine?.index,
      ),
      glutamicAcid: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.GlutamicAcid?.index,
      ),
      glutamine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Glutamine?.index,
      ),
      glycine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Glycine?.index,
      ),
      proline: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Proline?.index,
      ),
      serine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Serine?.index,
      ),
      tyrosine: pickByIndex(
        safeAminoAcids,
        AMINO_ACIDS_FALLBACK.Tyrosine?.index,
      ),
      calcium: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Calcium?.index,
      ),
      copper: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Copper?.index,
      ),
      iron: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Iron?.index,
      ),
      manganese: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Manganese?.index,
      ),
      magnesium: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Magnesium?.index,
      ),
      phosphorus: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Phosphorus?.index,
      ),
      sodium: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Sodium?.index,
      ),
      potassium: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Potassium?.index,
      ),
      zinc: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Zinc?.index,
      ),
      fluoride: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Fluoride?.index,
      ),
      selenium: pickByIndex(
        safeMinerals,
        MINERALS_FALLBACK.Selenium?.index,
      ),
    };
  }, [food, language]);

  if (!food) {
    return <p>Selecione um alimento para editar.</p>;
  }

  const handleDeleteRequest = async () => {
    if (!food?.id) return;
    const confirmed = typeof window !== 'undefined'
      ? window.confirm('Deseja solicitar a exclusao deste alimento? Essa acao sera enviada para aprovacao.')
      : false;
    if (!confirmed) return;
    try {
      setDeleting(true);
      const ok = await submitFoodDeletion(food.id);
      alert(
        ok
          ? 'Solicitacao de exclusao enviada para aprovacao.'
          : 'Nao foi possivel enviar a solicitacao de exclusao.',
      );
    } finally {
      setDeleting(false);
    }
  };

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
        <FoodRegisterForm
          food={food}
          onRequestDelete={handleDeleteRequest}
          deleting={deleting}
          hideActions={hideActions}
          formId={formId}
          {...formik}
        />
      )}
    </Formik>
  );
};

export default FoodRegister;
