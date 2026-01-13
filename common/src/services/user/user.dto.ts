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
import type { UserDietaryRestrictions } from '../common/common.model';

// All fields optional to support partial updates (PUT)
export interface UserProfileDto extends Partial<UserDietaryRestrictions> {
  themeColor?: ThemeColor;
  locale?: string | null;
  language?: Language;
  visibility?: Visibility;
  displayName?: string | null;
  pictureUrl?: string | null;
  description?: string | null;
  givenName?: string | null;
  familyName?: string | null;
}

export interface UserProfileAdminDto extends UserProfileDto {
  featuredUntil?: string | null; // ISO 8601
}
