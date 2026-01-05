import { getApiBase } from '../http/api-base';
import { httpRequest } from '../http/http-client';
import type {
  WorkspaceIndexResponse,
  WorkspaceResponse,
} from './workspace.response';

const API_BASE = () => `${getApiBase()}/api/workspace`;

export async function getWorkspace(): Promise<WorkspaceResponse> {
  const res = await httpRequest<WorkspaceResponse>({
    url: API_BASE(),
    method: 'GET',
  });
  return res.data;
}

export async function getWorkspaceIndex(): Promise<WorkspaceIndexResponse> {
  const res = await httpRequest<WorkspaceIndexResponse>({
    url: `${API_BASE()}/index`,
    method: 'GET',
  });
  return res.data;
}
