import type { Language } from '../language/language.types';
import type {
  AllergyRestriction,
  CulturalRestriction,
  DietStyleRestriction,
  IntoleranceRestriction,
  MedicalRestriction,
  PersonalPreferenceRestriction,
  ThemeColor,
  Visibility,
} from '../common/common.types';

// All fields optional to support partial updates (PUT)
export interface UserProfileDto {
  themeColor?: ThemeColor;
  locale?: string | null;
  language?: Language;
  visibility?: Visibility;
  displayName?: string | null;
  pictureUrl?: string | null;
  description?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  allergies?: AllergyRestriction[];
  intolerances?: IntoleranceRestriction[];
  medicalRestrictions?: MedicalRestriction[];
  dietStyles?: DietStyleRestriction[];
  culturalRestrictions?: CulturalRestriction[];
  personalPreferences?: PersonalPreferenceRestriction[];
}

export interface UserProfileAdminDto extends UserProfileDto {
  featuredUntil?: string | null; // ISO 8601
}
