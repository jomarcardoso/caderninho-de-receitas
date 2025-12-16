import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import type { NutrientData } from '../nutrient-data/nutrient-data.model';

export type DietaryRestrictionGroup =
  | 'allergies'
  | 'intolerances'
  | 'medicalRestrictions'
  | 'dietStyles'
  | 'culturalRestrictions'
  | 'personalPreferences';

export interface DietaryRestrictionOption {
  key: string;
  group: DietaryRestrictionGroup;
  text: LanguageText;
  critical?: boolean;
}

export interface UserDietaryRestrictions {
  allergies: string[];
  intolerances: string[];
  medicalRestrictions: string[];
  dietStyles: string[];
  culturalRestrictions: string[];
  personalPreferences: string[];
}

export type FoodClassificationGroup =
  | 'originAnimal'
  | 'originPlant'
  | 'originProcessed'
  | 'plantPart'
  | 'botanical'
  | 'chemical'
  | 'processing'
  | 'culinaryRole';

export interface FoodClassificationOption {
  key: string;
  group: FoodClassificationGroup;
  text: LanguageText;
}

export interface CommonData {
  measures: LanguageTextAndPlural[];
  foodTypes: LanguageText[];
  measurementUnits: LanguageTextAndPlural[];
  recipeCategories: Category[];
  vitamins: NutrientData[];
  aminoAcids: NutrientData[];
  minerals: NutrientData[];
  nutritionalInformation: NutrientData[];
  dietaryRestrictionOptions: Record<
    DietaryRestrictionGroup,
    DietaryRestrictionOption[]
  >;
  userDietaryRestrictions: UserDietaryRestrictions;
  foodClassificationOptions: FoodClassificationOption[];
}

export interface Category extends LanguageTextAndPlural {
  key: string;
  url: string;
  img: string;
  description?: LanguageText;
  bannerImg?: string;
}
