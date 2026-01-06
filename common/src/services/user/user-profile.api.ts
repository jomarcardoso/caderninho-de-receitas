import { getApiBase } from '../http/api-base';
import { httpRequest } from '../http/http-client';
import type {
  UserProfile,
  UserProfileAdmin,
  UserProfileOwner,
  UserProfileSummary,
} from './user.model';
import type { UserProfileAdminDto, UserProfileDto } from './user.dto';

const API_BASE = () => `${getApiBase()}/api/userprofile`;

export async function listUserProfiles(params?: {
  text?: string;
  limit?: number;
  isFeatured?: boolean;
}): Promise<UserProfileSummary[]> {
  const sp = new URLSearchParams();
  if (params?.text) sp.set('text', params.text);
  if (params?.limit !== undefined) sp.set('limit', String(params.limit));
  if (params?.isFeatured !== undefined)
    sp.set('isFeatured', params.isFeatured ? 'true' : 'false');

  const res = await httpRequest<UserProfileSummary[]>({
    url: `${API_BASE()}${sp.toString() ? `?${sp}` : ''}`,
    method: 'GET',
    skipAuth: !params?.isFeatured, // allow anonymous unless filtering private feature
  });
  return res.data;
}

export async function getUserProfile(
  id: string,
  opts?: { shareToken?: string },
): Promise<UserProfile | UserProfileOwner | UserProfileAdmin> {
  const sp = new URLSearchParams();
  if (opts?.shareToken) sp.set('shareToken', opts.shareToken);

  const res = await httpRequest<
    UserProfile | UserProfileOwner | UserProfileAdmin
  >({
    url: `${API_BASE()}/${encodeURIComponent(id)}${
      sp.toString() ? `?${sp}` : ''
    }`,
    method: 'GET',
    skipAuth: !!opts?.shareToken,
  });
  return res.data;
}

export async function updateUserProfile(
  id: string,
  dto: UserProfileDto | UserProfileAdminDto,
  isAdmin = false,
): Promise<UserProfileOwner | UserProfileAdmin> {
  const res = await httpRequest<UserProfileOwner | UserProfileAdmin>({
    url: `${API_BASE()}/${encodeURIComponent(id)}`,
    method: 'PUT',
    data: dto,
    // Admin updates use auth; owner updates also use auth
  });
  return res.data;
}
