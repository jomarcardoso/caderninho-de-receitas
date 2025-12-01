import type { FoodForm } from '../components/food-register/food-register-form';
import type { Language } from 'services/language/language.types';

function toNumber(value: unknown): number | undefined {
  if (value === '' || value === null || value === undefined) return undefined;
  const n = typeof value === 'string' ? Number(value) : (value as number);
  return Number.isFinite(n) ? n : undefined;
}

function buildNumericMap(entries: Array<[string, unknown]>): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [key, val] of entries) {
    const n = toNumber(val);
    if (n !== undefined) result[key] = n;
  }
  return result;
}

export function buildFoodPayloadForSave(form: FoodForm, language: Language) {
  const lang = (language || 'pt') as Language;
  const trim = (v: string | undefined) => (v || '').trim();

  const name: Record<Language, string> = { en: '', pt: '' } as any;
  const description: Record<Language, string> = { en: '', pt: '' } as any;
  const keys: Record<Language, string> = { en: '', pt: '' } as any;
  name[lang] = trim((form as any).name);
  description[lang] = trim((form as any).description);
  keys[lang] = '';

  const nutritionalInformation = buildNumericMap([
    ['Gi', form.gi],
    ['Calories', form.calories],
    ['Carbohydrates', form.carbohydrates],
    ['Proteins', form.proteins],
    ['TotalFat', form.totalFat],
    ['SaturedFats', (form as any).saturedFats],
    ['DietaryFiber', (form as any).dietaryFiber],
    ['Sugar', (form as any).sugar],
    ['MonounsaturatedFats', (form as any).monounsaturatedFats],
    ['PolyunsaturatedFats', (form as any).polyunsaturatedFats],
  ]);

  const aminoAcids = buildNumericMap([
    ['Tryptophan', (form as any).tryptophan],
    ['Phenylalanine', (form as any).phenylalanine],
    ['Leucine', (form as any).leucine],
    ['Valine', (form as any).valine],
    ['Isoleucine', (form as any).isoleucine],
    ['Lysine', (form as any).lysine],
    ['Threonine', (form as any).threonine],
    ['Methionine', (form as any).methionine],
    ['Histidine', (form as any).histidine],
    ['Alanine', (form as any).alanine],
    ['Arginine', (form as any).arginine],
    ['AsparticAcid', (form as any).asparticAcid],
    ['Cystine', (form as any).cystine],
    ['GlutamicAcid', (form as any).glutamicAcid],
    ['Glutamine', (form as any).glutamine],
    ['Glycine', (form as any).glycine],
    ['Proline', (form as any).proline],
    ['Serine', (form as any).serine],
    ['Tyrosine', (form as any).tyrosine],
  ]);

  const minerals = buildNumericMap([
    ['Calcium', (form as any).calcium],
    ['Copper', (form as any).copper],
    ['Iron', (form as any).iron],
    ['Manganese', (form as any).manganese],
    ['Magnesium', (form as any).magnesium],
    ['Phosphorus', (form as any).phosphorus],
    ['Sodium', (form as any).sodium],
    ['Potassium', (form as any).potassium],
    ['Zinc', (form as any).zinc],
    ['Fluoride', (form as any).fluoride],
    ['Selenium', (form as any).selenium],
  ]);

  const payload: any = {
    name,
    description,
    imgs: Array.isArray((form as any).imgs) ? (form as any).imgs : ([] as string[]),
    keys,
    type: 0,
    measurementUnit: 0,
  };

  if (Object.keys(nutritionalInformation).length > 0) {
    payload.nutritionalInformation = nutritionalInformation;
  }
  if (Object.keys(aminoAcids).length > 0) {
    payload.aminoAcids = aminoAcids;
  }
  if (Object.keys(minerals).length > 0) {
    payload.minerals = minerals;
  }

  const iconTrimmed = trim((form as any).icon);
  if (iconTrimmed) {
    payload.icon = iconTrimmed;
  }
  if (typeof (form as any).iconId === 'number' && (form as any).iconId > 0) {
    payload.iconId = (form as any).iconId;
  }

  return payload;
}
