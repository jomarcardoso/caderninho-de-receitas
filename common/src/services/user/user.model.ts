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
} from '../common/common.types';

export interface UserProfile {
  id: string;
  themeColor: ThemeColor;
  locale?: string | null;
  language: Language;
  isPublic?: boolean;
  displayName?: string | null;
  pictureUrl?: string | null;
  description?: string | null;
}

export interface UserProfileOwner extends UserProfile {
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

export interface User {
  token: string;
  profile: UserProfileOwner;
}

export interface UserProfileAdmin extends UserProfileOwner {
  featuredAt?: string | null;
}

export interface UserProfileSummary {
  id: string;
  displayName: string;
  pictureUrl?: string | null;
  isFeatured: boolean;
}
