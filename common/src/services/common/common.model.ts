import type {
  LanguageText,
  LanguageTextAndPlural,
} from '../language/language.types';
import type {
  AllergyRestriction,
  CulturalRestriction,
  DietStyleRestriction,
  IntoleranceRestriction,
  MedicalRestriction,
  PersonalPreferenceRestriction,
} from './common.types';

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
  allergies: AllergyRestriction[];
  intolerances: IntoleranceRestriction[];
  medicalRestrictions: MedicalRestriction[];
  dietStyles: DietStyleRestriction[];
  culturalRestrictions: CulturalRestriction[];
  personalPreferences: PersonalPreferenceRestriction[];
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

export interface Category extends LanguageTextAndPlural {
  key: string;
  url: string;
  img: string;
  description?: LanguageText;
  bannerImg?: string;
}
