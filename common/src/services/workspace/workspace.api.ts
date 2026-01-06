import { getApiBase } from '../http/api-base';
import { httpRequest } from '../http/http-client';
import type { WorkspaceIndex, Workspace } from './workspace.model';

const API_BASE = () => `${getApiBase()}/api/workspace`;

export async function getWorkspace(): Promise<Workspace> {
  const res = await httpRequest<Workspace>({
    url: API_BASE(),
    method: 'GET',
  });
  return res.data;
}

export async function getWorkspaceIndex(): Promise<WorkspaceIndex> {
  const res = await httpRequest<WorkspaceIndex>({
    url: `${API_BASE()}/index`,
    method: 'GET',
  });
  return res.data;
}
