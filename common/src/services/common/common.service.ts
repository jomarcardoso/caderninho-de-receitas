import {
  type CommonData,
  type UserDietaryRestrictions,
  type DietaryRestrictionGroup,
  type DietaryRestrictionOption,
} from './common.model';
import type { CommonDataResponse } from './common.response';

const DEFAULT_USER_RESTRICTIONS: UserDietaryRestrictions = {
  allergies: [],
  intolerances: [],
  medicalRestrictions: [],
  dietStyles: [],
  culturalRestrictions: [],
  personalPreferences: [],
};

export const DEFAULT_RESTRICTION_OPTIONS: Record<
  DietaryRestrictionGroup,
  DietaryRestrictionOption[]
> = {
  allergies: [
    { key: 'Peanut', group: 'allergies', text: { en: 'Peanut', pt: 'Amendoim' }, critical: true },
    {
      key: 'TreeNuts',
      group: 'allergies',
      text: { en: 'Tree nuts', pt: 'Oleaginosas / Nozes' },
      critical: true,
    },
    { key: 'Milk', group: 'allergies', text: { en: 'Milk', pt: 'Leite / Lácteos' }, critical: true },
    { key: 'Egg', group: 'allergies', text: { en: 'Egg', pt: 'Ovos' }, critical: true },
    { key: 'Wheat', group: 'allergies', text: { en: 'Wheat / Gluten', pt: 'Trigo / Glúten' }, critical: true },
    { key: 'Soy', group: 'allergies', text: { en: 'Soy', pt: 'Soja' }, critical: true },
    { key: 'Fish', group: 'allergies', text: { en: 'Fish', pt: 'Peixes' }, critical: true },
    { key: 'Shellfish', group: 'allergies', text: { en: 'Shellfish', pt: 'Frutos do mar / Mariscos' }, critical: true },
    { key: 'Sesame', group: 'allergies', text: { en: 'Sesame', pt: 'Gergelim' }, critical: true },
    { key: 'Corn', group: 'allergies', text: { en: 'Corn', pt: 'Milho' } },
    { key: 'Mustard', group: 'allergies', text: { en: 'Mustard', pt: 'Mostarda' } },
    { key: 'Celery', group: 'allergies', text: { en: 'Celery', pt: 'Aipo' } },
    { key: 'Sulfite', group: 'allergies', text: { en: 'Sulfite', pt: 'Sulfito (aditivo)' } },
    { key: 'Cocoa', group: 'allergies', text: { en: 'Cocoa / Chocolate', pt: 'Chocolate / Cacau' } },
    { key: 'Gelatin', group: 'allergies', text: { en: 'Gelatin', pt: 'Gelatina (origem animal)' } },
  ],
  intolerances: [
    { key: 'Lactose', group: 'intolerances', text: { en: 'Lactose', pt: 'Lactose' } },
    { key: 'GlutenSensitive', group: 'intolerances', text: { en: 'Gluten sensitivity', pt: 'Glúten (sensibilidade)' } },
    { key: 'Fructose', group: 'intolerances', text: { en: 'Fructose', pt: 'Frutose' } },
    { key: 'Histamine', group: 'intolerances', text: { en: 'Histamine', pt: 'Histamina' } },
    { key: 'FriedFatty', group: 'intolerances', text: { en: 'Fried / Oily foods', pt: 'Oleosidade / frituras' } },
    { key: 'SimpleSugars', group: 'intolerances', text: { en: 'Simple sugars', pt: 'Açúcares simples' } },
    { key: 'Caffeine', group: 'intolerances', text: { en: 'Caffeine', pt: 'Cafeína' } },
  ],
  medicalRestrictions: [
    { key: 'Diabetes', group: 'medicalRestrictions', text: { en: 'Diabetes', pt: 'Diabetes' } },
    { key: 'Prediabetes', group: 'medicalRestrictions', text: { en: 'Prediabetes / Insulin resistance', pt: 'Pré-diabetes / resistência à insulina' } },
    { key: 'HighCholesterol', group: 'medicalRestrictions', text: { en: 'High cholesterol', pt: 'Colesterol alto' } },
    { key: 'HighTriglycerides', group: 'medicalRestrictions', text: { en: 'High triglycerides', pt: 'Triglicerídeos altos' } },
    { key: 'Hypertension', group: 'medicalRestrictions', text: { en: 'Hypertension (low sodium)', pt: 'Hipertensão (baixo sódio)' } },
    { key: 'KidneyDisease', group: 'medicalRestrictions', text: { en: 'Kidney disease', pt: 'Doença renal' } },
    { key: 'Celiac', group: 'medicalRestrictions', text: { en: 'Celiac disease', pt: 'Doença celíaca' } },
    { key: 'Ibs', group: 'medicalRestrictions', text: { en: 'IBS (FODMAP)', pt: 'SII / FODMAP' } },
    { key: 'Gerd', group: 'medicalRestrictions', text: { en: 'GERD / Reflux', pt: 'Refluxo (DRGE)' } },
    { key: 'Gastritis', group: 'medicalRestrictions', text: { en: 'Gastritis', pt: 'Gastrite' } },
    { key: 'Crohn', group: 'medicalRestrictions', text: { en: 'Crohn’s disease', pt: 'Doença de Crohn' } },
    { key: 'UlcerativeColitis', group: 'medicalRestrictions', text: { en: 'Ulcerative colitis', pt: 'Colite ulcerativa' } },
  ],
  dietStyles: [
    { key: 'Vegetarian', group: 'dietStyles', text: { en: 'Vegetarian', pt: 'Vegetariano' } },
    { key: 'Vegan', group: 'dietStyles', text: { en: 'Vegan', pt: 'Vegano' } },
    { key: 'OvoLacto', group: 'dietStyles', text: { en: 'Ovolacto-vegetarian', pt: 'Ovolactovegetariano' } },
    { key: 'Pescetarian', group: 'dietStyles', text: { en: 'Pescetarian', pt: 'Pescetariano' } },
    { key: 'LowCarb', group: 'dietStyles', text: { en: 'Low-carb', pt: 'Low-carb' } },
    { key: 'Keto', group: 'dietStyles', text: { en: 'Keto', pt: 'Keto' } },
    { key: 'Paleo', group: 'dietStyles', text: { en: 'Paleo', pt: 'Paleo' } },
    { key: 'Mediterranean', group: 'dietStyles', text: { en: 'Mediterranean', pt: 'Mediterrânea' } },
    { key: 'Whole30', group: 'dietStyles', text: { en: 'Whole30', pt: 'Whole30' } },
    { key: 'LowFodmap', group: 'dietStyles', text: { en: 'Low FODMAP', pt: 'Baixo FODMAP' } },
    { key: 'HighProtein', group: 'dietStyles', text: { en: 'High-protein', pt: 'High-protein' } },
    { key: 'PlantBased', group: 'dietStyles', text: { en: 'Plant-based', pt: 'Plant-based' } },
  ],
  culturalRestrictions: [
    { key: 'Kosher', group: 'culturalRestrictions', text: { en: 'Kosher', pt: 'Kosher' } },
    { key: 'Halal', group: 'culturalRestrictions', text: { en: 'Halal', pt: 'Halal' } },
    { key: 'Hindu', group: 'culturalRestrictions', text: { en: 'Hindu (no beef)', pt: 'Hindu (evita carne bovina)' } },
    { key: 'Buddhist', group: 'culturalRestrictions', text: { en: 'Buddhist (often vegetarian)', pt: 'Budista (geralmente vegetariano)' } },
    { key: 'Adventist', group: 'culturalRestrictions', text: { en: 'Adventist (no meat/caffeine)', pt: 'Adventista (sem carne e sem café)' } },
  ],
  personalPreferences: [
    { key: 'NoSpicy', group: 'personalPreferences', text: { en: 'No spicy foods', pt: 'Sem alimentos apimentados' } },
    { key: 'NoVerySweet', group: 'personalPreferences', text: { en: 'No very sweet foods', pt: 'Sem alimentos muito doces' } },
    { key: 'NoFried', group: 'personalPreferences', text: { en: 'No fried foods', pt: 'Sem frituras' } },
    { key: 'NoAlcohol', group: 'personalPreferences', text: { en: 'No alcoholic drinks', pt: 'Sem bebidas alcoólicas' } },
    { key: 'NoRedMeat', group: 'personalPreferences', text: { en: 'No red meat', pt: 'Sem carnes vermelhas' } },
    { key: 'NoWhiteMeat', group: 'personalPreferences', text: { en: 'No white meat', pt: 'Sem carnes brancas' } },
  ],
};

function mergeOptions(
  provided: CommonDataResponse['dietaryRestrictionOptions'],
): Record<DietaryRestrictionGroup, DietaryRestrictionOption[]> {
  const base = { ...DEFAULT_RESTRICTION_OPTIONS };

  if (!provided) return base;

  const entries = Object.entries(provided) as Array<
    [DietaryRestrictionGroup, DietaryRestrictionOption[] | undefined]
  >;

  for (const [group, list] of entries) {
    if (!group || !Array.isArray(list)) continue;
    base[group] = list;
  }

  return base;
}

function mergeUserRestrictions(
  provided: CommonDataResponse['userDietaryRestrictions'],
): UserDietaryRestrictions {
  return {
    ...DEFAULT_USER_RESTRICTIONS,
    ...(provided || {}),
  };
}

export function mapCommonResponseToModel(data: CommonDataResponse): CommonData {
  const {
    measures = {} as CommonDataResponse['measures'],
    foodTypes = {} as CommonDataResponse['foodTypes'],
    measurementUnits = {} as CommonDataResponse['measurementUnits'],
    recipeCategories = {} as CommonDataResponse['recipeCategories'],
    vitamins = {} as CommonDataResponse['vitamins'],
    aminoAcids = {} as CommonDataResponse['aminoAcids'],
    minerals = {} as CommonDataResponse['minerals'],
    nutritionalInformation = {} as CommonDataResponse['nutritionalInformation'],
    dietaryRestrictionOptions,
    userDietaryRestrictions,
  } = (data || {}) as CommonDataResponse;

  return {
    measures: Object.values(measures),
    foodTypes: Object.values(foodTypes),
    measurementUnits: Object.values(measurementUnits),
    recipeCategories: Object.entries(recipeCategories).map(([key, val]) => ({
      key,
      text: val.text,
      pluralText: val.pluralText,
      img: (val as any)?.img || '',
      url: (val as any)?.url || key,
      description: (val as any)?.description,
      bannerImg: (val as any)?.bannerImg || '',
    })),
    vitamins: Object.values(vitamins),
    aminoAcids: Object.values(aminoAcids),
    minerals: Object.values(minerals),
    nutritionalInformation: Object.values(nutritionalInformation),
    dietaryRestrictionOptions: mergeOptions(dietaryRestrictionOptions),
    userDietaryRestrictions: mergeUserRestrictions(userDietaryRestrictions),
  };
}
