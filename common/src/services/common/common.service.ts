import {
  type CommonData,
  type UserDietaryRestrictions,
  type DietaryRestrictionGroup,
  type DietaryRestrictionOption,
  type FoodClassificationOption,
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
    { key: 'peanut', group: 'allergies', text: { en: 'Peanut', pt: 'Amendoim' }, critical: true },
    {
      key: 'treeNuts',
      group: 'allergies',
      text: { en: 'Tree nuts', pt: 'Oleaginosas / Nozes' },
      critical: true,
    },
    { key: 'milk', group: 'allergies', text: { en: 'Milk', pt: 'Leite / Lácteos' }, critical: true },
    { key: 'egg', group: 'allergies', text: { en: 'Egg', pt: 'Ovos' }, critical: true },
    { key: 'wheat', group: 'allergies', text: { en: 'Wheat / Gluten', pt: 'Trigo / Glúten' }, critical: true },
    { key: 'soy', group: 'allergies', text: { en: 'Soy', pt: 'Soja' }, critical: true },
    { key: 'fish', group: 'allergies', text: { en: 'Fish', pt: 'Peixes' }, critical: true },
    { key: 'shellfish', group: 'allergies', text: { en: 'Shellfish', pt: 'Frutos do mar / Mariscos' }, critical: true },
    { key: 'sesame', group: 'allergies', text: { en: 'Sesame', pt: 'Gergelim' }, critical: true },
    { key: 'corn', group: 'allergies', text: { en: 'Corn', pt: 'Milho' } },
    { key: 'mustard', group: 'allergies', text: { en: 'Mustard', pt: 'Mostarda' } },
    { key: 'celery', group: 'allergies', text: { en: 'Celery', pt: 'Aipo' } },
    { key: 'sulfite', group: 'allergies', text: { en: 'Sulfite', pt: 'Sulfito (aditivo)' } },
    { key: 'cocoa', group: 'allergies', text: { en: 'Cocoa / Chocolate', pt: 'Chocolate / Cacau' } },
    { key: 'gelatin', group: 'allergies', text: { en: 'Gelatin', pt: 'Gelatina (origem animal)' } },
  ],
  intolerances: [
    { key: 'lactose', group: 'intolerances', text: { en: 'Lactose', pt: 'Lactose' } },
    { key: 'glutenSensitive', group: 'intolerances', text: { en: 'Gluten sensitivity', pt: 'Glúten (sensibilidade)' } },
    { key: 'fructose', group: 'intolerances', text: { en: 'Fructose', pt: 'Frutose' } },
    { key: 'histamine', group: 'intolerances', text: { en: 'Histamine', pt: 'Histamina' } },
    { key: 'friedFatty', group: 'intolerances', text: { en: 'Fried / Oily foods', pt: 'Oleosidade / frituras' } },
    { key: 'simpleSugars', group: 'intolerances', text: { en: 'Simple sugars', pt: 'Açúcares simples' } },
    { key: 'caffeine', group: 'intolerances', text: { en: 'Caffeine', pt: 'Cafeína' } },
  ],
  medicalRestrictions: [
    { key: 'diabetes', group: 'medicalRestrictions', text: { en: 'Diabetes', pt: 'Diabetes' } },
    { key: 'prediabetes', group: 'medicalRestrictions', text: { en: 'Prediabetes / Insulin resistance', pt: 'Pré-diabetes / resistência à insulina' } },
    { key: 'highCholesterol', group: 'medicalRestrictions', text: { en: 'High cholesterol', pt: 'Colesterol alto' } },
    { key: 'highTriglycerides', group: 'medicalRestrictions', text: { en: 'High triglycerides', pt: 'Triglicerídeos altos' } },
    { key: 'hypertension', group: 'medicalRestrictions', text: { en: 'Hypertension (low sodium)', pt: 'Hipertensão (baixo sódio)' } },
    { key: 'kidneyDisease', group: 'medicalRestrictions', text: { en: 'Kidney disease', pt: 'Doença renal' } },
    { key: 'celiac', group: 'medicalRestrictions', text: { en: 'Celiac disease', pt: 'Doença celíaca' } },
    { key: 'ibs', group: 'medicalRestrictions', text: { en: 'IBS (FODMAP)', pt: 'SII / FODMAP' } },
    { key: 'gerd', group: 'medicalRestrictions', text: { en: 'GERD / Reflux', pt: 'Refluxo (DRGE)' } },
    { key: 'gastritis', group: 'medicalRestrictions', text: { en: 'Gastritis', pt: 'Gastrite' } },
    { key: 'crohn', group: 'medicalRestrictions', text: { en: 'Crohn’s disease', pt: 'Doença de Crohn' } },
    { key: 'ulcerativeColitis', group: 'medicalRestrictions', text: { en: 'Ulcerative colitis', pt: 'Colite ulcerativa' } },
  ],
  dietStyles: [
    { key: 'vegetarian', group: 'dietStyles', text: { en: 'Vegetarian', pt: 'Vegetariano' } },
    { key: 'vegan', group: 'dietStyles', text: { en: 'Vegan', pt: 'Vegano' } },
    { key: 'ovoLacto', group: 'dietStyles', text: { en: 'Ovolacto-vegetarian', pt: 'Ovolactovegetariano' } },
    { key: 'pescetarian', group: 'dietStyles', text: { en: 'Pescetarian', pt: 'Pescetariano' } },
    { key: 'lowCarb', group: 'dietStyles', text: { en: 'Low-carb', pt: 'Low-carb' } },
    { key: 'keto', group: 'dietStyles', text: { en: 'Keto', pt: 'Keto' } },
    { key: 'paleo', group: 'dietStyles', text: { en: 'Paleo', pt: 'Paleo' } },
    { key: 'mediterranean', group: 'dietStyles', text: { en: 'Mediterranean', pt: 'Mediterrânea' } },
    { key: 'whole30', group: 'dietStyles', text: { en: 'Whole30', pt: 'Whole30' } },
    { key: 'lowFodmap', group: 'dietStyles', text: { en: 'Low FODMAP', pt: 'Baixo FODMAP' } },
    { key: 'highProtein', group: 'dietStyles', text: { en: 'High-protein', pt: 'High-protein' } },
    { key: 'plantBased', group: 'dietStyles', text: { en: 'Plant-based', pt: 'Plant-based' } },
  ],
  culturalRestrictions: [
    { key: 'kosher', group: 'culturalRestrictions', text: { en: 'Kosher', pt: 'Kosher' } },
    { key: 'halal', group: 'culturalRestrictions', text: { en: 'Halal', pt: 'Halal' } },
    { key: 'hindu', group: 'culturalRestrictions', text: { en: 'Hindu (no beef)', pt: 'Hindu (evita carne bovina)' } },
    { key: 'buddhist', group: 'culturalRestrictions', text: { en: 'Buddhist (often vegetarian)', pt: 'Budista (geralmente vegetariano)' } },
    { key: 'adventist', group: 'culturalRestrictions', text: { en: 'Adventist (no meat/caffeine)', pt: 'Adventista (sem carne e sem café)' } },
  ],
  personalPreferences: [
    { key: 'noSpicy', group: 'personalPreferences', text: { en: 'No spicy foods', pt: 'Sem alimentos apimentados' } },
    { key: 'noVerySweet', group: 'personalPreferences', text: { en: 'No very sweet foods', pt: 'Sem alimentos muito doces' } },
    { key: 'noFried', group: 'personalPreferences', text: { en: 'No fried foods', pt: 'Sem frituras' } },
    { key: 'noAlcohol', group: 'personalPreferences', text: { en: 'No alcoholic drinks', pt: 'Sem bebidas alcoólicas' } },
    { key: 'noRedMeat', group: 'personalPreferences', text: { en: 'No red meat', pt: 'Sem carnes vermelhas' } },
    { key: 'noWhiteMeat', group: 'personalPreferences', text: { en: 'No white meat', pt: 'Sem carnes brancas' } },
  ],
};

export const DEFAULT_FOOD_CLASSIFICATION_OPTIONS: FoodClassificationOption[] = [
  // Origem biológica - animal
  { key: 'OriginAnimal', group: 'originAnimal', text: { en: 'Animal origin', pt: 'Origem animal' } },
  { key: 'RedMeat', group: 'originAnimal', text: { en: 'Red meat', pt: 'Carne vermelha' } },
  { key: 'WhiteMeat', group: 'originAnimal', text: { en: 'White meat', pt: 'Carne branca' } },
  { key: 'Fish', group: 'originAnimal', text: { en: 'Fish', pt: 'Peixe' } },
  { key: 'Shellfish', group: 'originAnimal', text: { en: 'Shellfish / seafood', pt: 'Marisco / frutos do mar' } },
  { key: 'Eggs', group: 'originAnimal', text: { en: 'Eggs', pt: 'Ovos' } },
  { key: 'Dairy', group: 'originAnimal', text: { en: 'Dairy', pt: 'Laticínios' } },
  { key: 'Honey', group: 'originAnimal', text: { en: 'Honey / bee products', pt: 'Mel / produtos apícolas' } },

  // Origem biológica - vegetal
  { key: 'OriginPlant', group: 'originPlant', text: { en: 'Plant origin', pt: 'Origem vegetal' } },
  { key: 'Seeds', group: 'originPlant', text: { en: 'Seeds', pt: 'Sementes' } },
  { key: 'Oilseeds', group: 'originPlant', text: { en: 'Oilseeds (nuts)', pt: 'Oleaginosas (nozes, amêndoas...)' } },
  { key: 'Grains', group: 'originPlant', text: { en: 'Grains / cereals', pt: 'Grãos / cereais' } },
  { key: 'Legumes', group: 'originPlant', text: { en: 'Legumes / pulses', pt: 'Leguminosas (feijão, lentilha...)' } },
  { key: 'Fruits', group: 'originPlant', text: { en: 'Fruits', pt: 'Frutas' } },
  { key: 'Vegetables', group: 'originPlant', text: { en: 'Vegetables', pt: 'Hortaliças / vegetais' } },
  { key: 'Roots', group: 'originPlant', text: { en: 'Roots', pt: 'Raízes' } },
  { key: 'Tubers', group: 'originPlant', text: { en: 'Tubers', pt: 'Tubérculos' } },
  { key: 'Leafy', group: 'originPlant', text: { en: 'Leafy greens', pt: 'Folhosos' } },
  { key: 'Stalk', group: 'originPlant', text: { en: 'Stalk / stem', pt: 'Caule (aspargo, aipo)' } },
  { key: 'Flowers', group: 'originPlant', text: { en: 'Flowers', pt: 'Flores (brócolis, couve-flor)' } },
  { key: 'Herbs', group: 'originPlant', text: { en: 'Herbs', pt: 'Ervas' } },
  { key: 'Spices', group: 'originPlant', text: { en: 'Spices', pt: 'Especiarias' } },
  { key: 'Fungi', group: 'originPlant', text: { en: 'Fungi (mushrooms)', pt: 'Fungos (cogumelos)' } },

  // Origem não-biológica / processada
  { key: 'OriginProcessed', group: 'originProcessed', text: { en: 'Processed / non-biological', pt: 'Origem não-biológica / processada' } },
  { key: 'FoodAdditives', group: 'originProcessed', text: { en: 'Food additives', pt: 'Aditivos alimentares' } },
  { key: 'RefinedSugars', group: 'originProcessed', text: { en: 'Refined sugars', pt: 'Açúcares refinados' } },
  { key: 'ProcessedFats', group: 'originProcessed', text: { en: 'Processed fats', pt: 'Gorduras processadas' } },
  { key: 'FermentedOrigin', group: 'originProcessed', text: { en: 'Fermented', pt: 'Fermentados' } },
  { key: 'UltraProcessed', group: 'originProcessed', text: { en: 'Ultra-processed', pt: 'Ultraprocessados' } },

  // Parte da planta
  { key: 'PlantRoot', group: 'plantPart', text: { en: 'Root', pt: 'Raiz' } },
  { key: 'PlantTuber', group: 'plantPart', text: { en: 'Tuber', pt: 'Tubérculo' } },
  { key: 'PlantRhizome', group: 'plantPart', text: { en: 'Rhizome', pt: 'Rizoma' } },
  { key: 'PlantBulb', group: 'plantPart', text: { en: 'Bulb', pt: 'Bulbo (alho, cebola)' } },
  { key: 'PlantStem', group: 'plantPart', text: { en: 'Stem', pt: 'Caule' } },
  { key: 'PlantLeaf', group: 'plantPart', text: { en: 'Leaf', pt: 'Folha' } },
  { key: 'PlantFlower', group: 'plantPart', text: { en: 'Flower', pt: 'Flor' } },
  { key: 'PlantSeed', group: 'plantPart', text: { en: 'Seed', pt: 'Semente' } },
  { key: 'FleshyFruit', group: 'plantPart', text: { en: 'Fleshy fruit', pt: 'Fruto carnoso' } },
  { key: 'DryFruit', group: 'plantPart', text: { en: 'Dry fruit', pt: 'Fruto seco' } },
  { key: 'PodLegume', group: 'plantPart', text: { en: 'Pod legume', pt: 'Legume (vagem/ervilha/feijão verde)' } },

  // Perfil botânico / grupo natural
  { key: 'Citrus', group: 'botanical', text: { en: 'Citrus', pt: 'Cítricos' } },
  { key: 'Solanaceae', group: 'botanical', text: { en: 'Solanaceae', pt: 'Solanáceas' } },
  { key: 'Cucurbitaceae', group: 'botanical', text: { en: 'Cucurbitaceae', pt: 'Cucurbitáceas' } },
  { key: 'Brassicas', group: 'botanical', text: { en: 'Brassicas', pt: 'Brássicas' } },
  { key: 'LegumeFamily', group: 'botanical', text: { en: 'Legume family', pt: 'Leguminosas' } },
  { key: 'NutFamily', group: 'botanical', text: { en: 'Nut family', pt: 'Oleaginosas' } },
  { key: 'Cereals', group: 'botanical', text: { en: 'Cereals', pt: 'Cereais' } },
  { key: 'BotanicalFungi', group: 'botanical', text: { en: 'Fungi', pt: 'Fungos' } },

  // Propriedades químicas e nutricionais
  { key: 'HighLactose', group: 'chemical', text: { en: 'High lactose', pt: 'Alto teor de lactose' } },
  { key: 'LactoseFree', group: 'chemical', text: { en: 'Lactose-free', pt: 'Livre de lactose' } },
  { key: 'HighGluten', group: 'chemical', text: { en: 'High gluten', pt: 'Alto teor de glúten' } },
  { key: 'GlutenFreeNatural', group: 'chemical', text: { en: 'Naturally gluten-free', pt: 'Sem glúten natural' } },
  { key: 'HighFiber', group: 'chemical', text: { en: 'High fiber', pt: 'Rico em fibras' } },
  { key: 'HighGI', group: 'chemical', text: { en: 'High glycemic index', pt: 'Alto índice glicêmico' } },
  { key: 'LowGI', group: 'chemical', text: { en: 'Low glycemic index', pt: 'Baixo índice glicêmico' } },
  { key: 'HighProtein', group: 'chemical', text: { en: 'High protein', pt: 'Alto teor proteico' } },
  { key: 'HighFat', group: 'chemical', text: { en: 'High fat', pt: 'Alto teor de gordura' } },
  { key: 'HighSodium', group: 'chemical', text: { en: 'High sodium', pt: 'Alto teor de sódio' } },
  { key: 'ContainsCaffeine', group: 'chemical', text: { en: 'Contains caffeine', pt: 'Contém cafeína' } },
  { key: 'FermentedChem', group: 'chemical', text: { en: 'Fermented', pt: 'Fermentado' } },
  { key: 'HighHistamine', group: 'chemical', text: { en: 'High histamine', pt: 'Rico em histamina' } },

  // Processamento
  { key: 'Raw', group: 'processing', text: { en: 'Raw', pt: 'Cru' } },
  { key: 'MinimallyProcessed', group: 'processing', text: { en: 'Minimally processed', pt: 'Minimamente processado' } },
  { key: 'Smoked', group: 'processing', text: { en: 'Smoked', pt: 'Defumado' } },
  { key: 'Cured', group: 'processing', text: { en: 'Cured', pt: 'Curado' } },
  { key: 'Fried', group: 'processing', text: { en: 'Fried', pt: 'Frito' } },
  { key: 'Baked', group: 'processing', text: { en: 'Baked', pt: 'Assado' } },
  { key: 'Grilled', group: 'processing', text: { en: 'Grilled', pt: 'Grelhado' } },
  { key: 'Boiled', group: 'processing', text: { en: 'Boiled', pt: 'Cozido' } },
  { key: 'Dehydrated', group: 'processing', text: { en: 'Dehydrated', pt: 'Desidratado' } },
  { key: 'Frozen', group: 'processing', text: { en: 'Frozen', pt: 'Congelado' } },
  { key: 'Preserved', group: 'processing', text: { en: 'Preserved (salt/oil/vinegar)', pt: 'Conservado (sal/óleo/vinagre)' } },

  // Finalidade culinária
  { key: 'BaseIngredient', group: 'culinaryRole', text: { en: 'Base ingredient', pt: 'Ingrediente base' } },
  { key: 'Condiment', group: 'culinaryRole', text: { en: 'Condiment', pt: 'Condimento' } },
  { key: 'Seasoning', group: 'culinaryRole', text: { en: 'Seasoning', pt: 'Tempero' } },
  { key: 'Sauce', group: 'culinaryRole', text: { en: 'Sauce', pt: 'Molho' } },
  { key: 'Beverage', group: 'culinaryRole', text: { en: 'Beverage', pt: 'Bebida' } },
  { key: 'SideDish', group: 'culinaryRole', text: { en: 'Side dish', pt: 'Acompanhamento' } },
  { key: 'Garnish', group: 'culinaryRole', text: { en: 'Garnish', pt: 'Guarnição' } },
  { key: 'Dessert', group: 'culinaryRole', text: { en: 'Dessert', pt: 'Sobremesa' } },
  { key: 'MainProtein', group: 'culinaryRole', text: { en: 'Main protein', pt: 'Proteína principal' } },
];

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
    foodClassificationOptions:
      Array.isArray(data?.foodClassificationOptions) &&
      data!.foodClassificationOptions!.length > 0
        ? data!.foodClassificationOptions!
        : DEFAULT_FOOD_CLASSIFICATION_OPTIONS,
  };
}

