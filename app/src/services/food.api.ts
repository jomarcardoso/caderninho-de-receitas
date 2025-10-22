import type { Language } from 'services/language/language.types';
import type { Food } from 'services/food/food.model';
import type { FoodForm } from '../components/food-register/food-register-form';

function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

function toNumber(val: number | '' | undefined): number { return typeof val === 'number' ? val : 0; }

function buildCreatePayload(form: FoodForm, language: Language) {
  const lang = (language || 'pt') as Language;
  const name: Record<Language, string> = { en: '', pt: '' } as any;
  const description: Record<Language, string> = { en: '', pt: '' } as any;
  const keys: Record<Language, string> = { en: '', pt: '' } as any;
  name[lang] = form.name?.trim?.() || '';
  description[lang] = form.description?.trim?.() || '';
  keys[lang] = '';

  const nutritionalInformation: any = {
    Gi: toNumber(form.gi),
    Calories: toNumber(form.calories),
    Carbohydrates: toNumber(form.carbohydrates),
    Proteins: toNumber(form.proteins),
    TotalFat: toNumber(form.totalFat),
    SaturedFats: toNumber(form.saturedFats),
  };

  const aminoAcids: any = {
    Tryptophan: toNumber((form as any).tryptophan),
    Phenylalanine: toNumber((form as any).phenylalanine),
    Leucine: toNumber((form as any).leucine),
    Valine: toNumber((form as any).valine),
    Isoleucine: toNumber((form as any).isoleucine),
    Lysine: toNumber((form as any).lysine),
    Threonine: toNumber((form as any).threonine),
    Methionine: toNumber((form as any).methionine),
    Histidine: toNumber((form as any).histidine),
  };

  const minerals: any = {
    Calcium: toNumber((form as any).calcium),
    Copper: toNumber((form as any).copper),
    Iron: toNumber((form as any).iron),
    Manganese: toNumber((form as any).manganese),
    Magnesium: toNumber((form as any).magnesium),
    Phosphorus: toNumber((form as any).phosphorus),
    Sodium: toNumber((form as any).sodium),
    Potassium: toNumber((form as any).potassium),
    Zinc: toNumber((form as any).zinc),
    Fluoride: toNumber((form as any).fluoride),
    Selenium: toNumber((form as any).selenium),
  };

  return {
    id: 0,
    name,
    description,
    imgs: [] as string[],
    keys,
    icon: '',
    type: 0, // Solid
    measurementUnit: 0, // Gram
    nutritionalInformation,
    minerals,
    aminoAcids,
    // vitamins omitted - default 0 on server
  };
}

function buildUpdateFormData(id: number, form: FoodForm, language: Language): FormData {
  const fd = new FormData();
  const lang = (language || 'pt') as Language;

  fd.append('Id', String(id));
  fd.append(`Name.${lang.toUpperCase() === 'PT' ? 'Pt' : 'En'}`, form.name || '');
  fd.append(`Description.${lang.toUpperCase() === 'PT' ? 'Pt' : 'En'}`, form.description || '');
  // NutritionalInformation.*
  if (form.gi !== '' && form.gi != null) fd.append('NutritionalInformation.Gi', String(form.gi));
  if (form.calories !== '' && form.calories != null) fd.append('NutritionalInformation.Calories', String(form.calories));
  if (form.carbohydrates !== '' && form.carbohydrates != null) fd.append('NutritionalInformation.Carbohydrates', String(form.carbohydrates));
  if (form.proteins !== '' && form.proteins != null) fd.append('NutritionalInformation.Proteins', String(form.proteins));
  if (form.totalFat !== '' && form.totalFat != null) fd.append('NutritionalInformation.TotalFat', String(form.totalFat));
  if (form.saturedFats !== '' && form.saturedFats != null) fd.append('NutritionalInformation.SaturedFats', String(form.saturedFats));

  // AminoAcids.*
  const aa: Array<[keyof FoodForm, string]> = [
    ['tryptophan', 'AminoAcids.Tryptophan'],
    ['phenylalanine', 'AminoAcids.Phenylalanine'],
    ['leucine', 'AminoAcids.Leucine'],
    ['valine', 'AminoAcids.Valine'],
    ['isoleucine', 'AminoAcids.Isoleucine'],
    ['lysine', 'AminoAcids.Lysine'],
    ['threonine', 'AminoAcids.Threonine'],
    ['methionine', 'AminoAcids.Methionine'],
    ['histidine', 'AminoAcids.Histidine'],
  ];
  for (const [key, path] of aa) {
    const v = (form as any)[key];
    if (v !== '' && v != null) fd.append(path, String(v));
  }

  // Minerals.*
  const mi: Array<[keyof FoodForm, string]> = [
    ['calcium', 'Minerals.Calcium'],
    ['copper', 'Minerals.Copper'],
    ['iron', 'Minerals.Iron'],
    ['manganese', 'Minerals.Manganese'],
    ['magnesium', 'Minerals.Magnesium'],
    ['phosphorus', 'Minerals.Phosphorus'],
    ['sodium', 'Minerals.Sodium'],
    ['potassium', 'Minerals.Potassium'],
    ['zinc', 'Minerals.Zinc'],
    ['fluoride', 'Minerals.Fluoride'],
    ['selenium', 'Minerals.Selenium'],
  ];
  for (const [key, path] of mi) {
    const v = (form as any)[key];
    if (v !== '' && v != null) fd.append(path, String(v));
  }

  return fd;
}

export async function saveFood(form: FoodForm, id = 0, language: Language = 'pt'): Promise<Food | null> {
  const base = getApiBase();

  try {
    if (id && id > 0) {
      // Update existing food via form-data as controller expects [FromForm]
      const fd = buildUpdateFormData(id, form, language);
      const res = await fetch(`${base}/api/food/${id}`, { method: 'POST', body: fd });
      if (!res.ok) throw new Error(`Failed to update food: ${res.status}`);
      return null; // Update returns NoContent
    }

    // Create new
    const payload = buildCreatePayload(form, language);
    const res = await fetch(`${base}/api/food`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Failed to create food: ${res.status}`);
    const data = (await res.json()) as Food;
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}












