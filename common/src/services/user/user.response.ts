import type { Language } from '../language/language.types';
import type {
  AllergyRestriction,
  CulturalRestriction,
  DietStyleRestriction,
  IntoleranceRestriction,
  MedicalRestriction,
  PersonalPreferenceRestriction,
  Role,
  ThemeColor,
  Visibility,
} from '../common/common.types';

export interface UserProfileResponse {
  id: string;
  themeColor: ThemeColor;
  locale?: string | null;
  language: Language;
  visibility: Visibility;
  displayName?: string | null;
  pictureUrl?: string | null;
  description?: string | null;
}

export interface UserProfileOwnerResponse extends UserProfileResponse {
  emails: string[];
  googleId?: string | null;
  googleEmailVerified: boolean;
  roles: Role[];
  givenName?: string | null;
  familyName?: string | null;
  allergies: AllergyRestriction[];
  intolerances: IntoleranceRestriction[];
  medicalRestrictions: MedicalRestriction[];
  dietStyles: DietStyleRestriction[];
  culturalRestrictions: CulturalRestriction[];
  personalPreferences: PersonalPreferenceRestriction[];
  shareToken?: string | null;
  shareTokenCreatedAt?: string | null;
  shareTokenRevokedAt?: string | null;
  moderationNotes?: string | null;
  isFeatured: boolean;
  featuredUntil?: string | null;
}

export interface UserProfileAdminResponse extends UserProfileOwnerResponse {
  featuredAt?: string | null;
}

export interface UserProfileSummaryResponse {
  id: string;
  displayName: string;
  pictureUrl?: string | null;
  isFeatured: boolean;
}
