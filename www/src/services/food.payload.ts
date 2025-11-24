import type { FoodForm } from '@/components/food-register/food-register-form';
import type { Language } from 'services/language/language.types';

function num(value: unknown): number {
  return typeof value === 'number' ? value : 0;
}

export function buildFoodPayloadForSave(
  form: FoodForm,
  language: Language,
) {
  const lang = (language || 'pt') as Language;
  const name: Record<Language, string> = { en: '', pt: '' } as any;
  const description: Record<Language, string> = { en: '', pt: '' } as any;
  const keys: Record<Language, string> = { en: '', pt: '' } as any;

  name[lang] = form.name?.trim?.() || '';
  description[lang] = form.description?.trim?.() || '';
  keys[lang] = '';

  const nutritionalInformation: Record<string, number> = {
    Gi: num(form.gi),
    Calories: num(form.calories),
    Carbohydrates: num(form.carbohydrates),
    Proteins: num(form.proteins),
    TotalFat: num(form.totalFat),
    SaturedFats: num((form as any).saturedFats),
    DietaryFiber: num((form as any).dietaryFiber),
    Sugar: num((form as any).sugar),
    MonounsaturatedFats: num((form as any).monounsaturatedFats),
    PolyunsaturatedFats: num((form as any).polyunsaturatedFats),
  };

  const aminoAcids: Record<string, number> = {
    Tryptophan: num((form as any).tryptophan),
    Phenylalanine: num((form as any).phenylalanine),
    Leucine: num((form as any).leucine),
    Valine: num((form as any).valine),
    Isoleucine: num((form as any).isoleucine),
    Lysine: num((form as any).lysine),
    Threonine: num((form as any).threonine),
    Methionine: num((form as any).methionine),
    Histidine: num((form as any).histidine),
    Alanine: num((form as any).alanine),
    Arginine: num((form as any).arginine),
    AsparticAcid: num((form as any).asparticAcid),
    Cystine: num((form as any).cystine),
    GlutamicAcid: num((form as any).glutamicAcid),
    Glutamine: num((form as any).glutamine),
    Glycine: num((form as any).glycine),
    Proline: num((form as any).proline),
    Serine: num((form as any).serine),
    Tyrosine: num((form as any).tyrosine),
  };

  const minerals: Record<string, number> = {
    Calcium: num((form as any).calcium),
    Copper: num((form as any).copper),
    Iron: num((form as any).iron),
    Manganese: num((form as any).manganese),
    Magnesium: num((form as any).magnesium),
    Phosphorus: num((form as any).phosphorus),
    Sodium: num((form as any).sodium),
    Potassium: num((form as any).potassium),
    Zinc: num((form as any).zinc),
    Fluoride: num((form as any).fluoride),
    Selenium: num((form as any).selenium),
  };

  return {
    name,
    description,
    imgs: Array.isArray((form as any).imgs) ? (form as any).imgs : [],
    keys,
    iconId: typeof (form as any).iconId === 'number' ? (form as any).iconId : 0,
    icon: (form as any).icon || '',
    type: 0,
    measurementUnit: 0,
    nutritionalInformation,
    minerals,
    aminoAcids,
  };
}

