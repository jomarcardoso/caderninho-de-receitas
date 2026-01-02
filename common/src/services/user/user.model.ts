import type {
  UserProfileAdminResponse,
  UserProfileOwnerResponse,
  UserProfileResponse,
  UserProfileSummaryResponse,
} from './user.response';

// For the UI model, reuse the richest shape (admin view) so consumers
// can handle all possible fields without widening types later.
export type UserProfile = UserProfileAdminResponse;
export type UserProfileSummary = UserProfileSummaryResponse;
