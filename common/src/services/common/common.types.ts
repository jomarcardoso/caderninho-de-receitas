// Shared enums used across multiple service interfaces
export type ThemeColor = 'primary' | 'green' | 'red' | 'purple';
export type Role = 'keeper' | 'moderator' | 'admin' | 'owner';
export type Visibility = 'private' | 'public';

export type AllergyRestriction =
  | 'peanut'
  | 'treeNuts'
  | 'milk'
  | 'egg'
  | 'wheat'
  | 'soy'
  | 'fish'
  | 'shellfish'
  | 'sesame'
  | 'corn'
  | 'mustard'
  | 'celery'
  | 'sulfite'
  | 'cocoa'
  | 'gelatin';

export type IntoleranceRestriction =
  | 'lactose'
  | 'glutenSensitive'
  | 'fructose'
  | 'histamine'
  | 'friedFatty'
  | 'simpleSugars'
  | 'caffeine';

export type MedicalRestriction =
  | 'diabetes'
  | 'prediabetes'
  | 'highCholesterol'
  | 'highTriglycerides'
  | 'hypertension'
  | 'kidneyDisease'
  | 'celiac'
  | 'ibs'
  | 'gerd'
  | 'gastritis'
  | 'crohn'
  | 'ulcerativeColitis';

export type DietStyleRestriction =
  | 'vegetarian'
  | 'vegan'
  | 'ovoLacto'
  | 'pescetarian'
  | 'lowCarb'
  | 'keto'
  | 'paleo'
  | 'mediterranean'
  | 'whole30'
  | 'lowFodmap'
  | 'highProtein'
  | 'plantBased';

export type CulturalRestriction =
  | 'kosher'
  | 'halal'
  | 'hindu'
  | 'buddhist'
  | 'adventist';

export type PersonalPreferenceRestriction =
  | 'noSpicy'
  | 'noVerySweet'
  | 'noFried'
  | 'noAlcohol'
  | 'noRedMeat'
  | 'noWhiteMeat';
