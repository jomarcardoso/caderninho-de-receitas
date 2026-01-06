import { getApiBase } from '../http/api-base';
import { httpRequest } from '../http/http-client';
import type { IconDto, Icon } from './icon.types';

const API_BASE = () => `${getApiBase()}/api/icon`;

export async function listIcons(): Promise<Icon[]> {
  const res = await httpRequest<Icon[]>({
    url: API_BASE(),
    method: 'GET',
  });
  return res.data;
}

export async function getIconById(id: number): Promise<Icon> {
  const res = await httpRequest<Icon>({
    url: `${API_BASE()}/${id}`,
    method: 'GET',
  });
  return res.data;
}

export async function createIcon(dto: IconDto): Promise<void> {
  await httpRequest<void>({
    url: API_BASE(),
    method: 'POST',
    data: dto,
  });
}

export async function createIconsBulk(dtos: IconDto[]): Promise<void> {
  await httpRequest<void>({
    url: `${API_BASE()}/bulk`,
    method: 'POST',
    data: dtos,
  });
}

export async function updateIcon(id: number, dto: IconDto): Promise<void> {
  await httpRequest<void>({
    url: `${API_BASE()}/${id}`,
    method: 'PUT',
    data: dto,
  });
}

export async function deleteIcon(id: number): Promise<void> {
  await httpRequest<void>({
    url: `${API_BASE()}/${id}`,
    method: 'DELETE',
  });
}
