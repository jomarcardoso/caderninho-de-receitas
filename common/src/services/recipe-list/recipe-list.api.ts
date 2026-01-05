import { getApiBase } from '../http/api-base';
import { httpRequest } from '../http/http-client';
import type { RecipeListDto } from './recipe-list.dto';
import type {
  RecipeListResponse,
  RecipeListSummaryResponse,
  RecipeListIndexResponse,
} from './recipe-list.response';

const API_BASE = () => `${getApiBase()}/api/recipelist`;

export async function listRecipeLists(): Promise<RecipeListSummaryResponse[]> {
  const res = await httpRequest<RecipeListSummaryResponse[]>({
    url: API_BASE(),
    method: 'GET',
  });
  return res.data;
}

export async function getRecipeList(id: number): Promise<RecipeListResponse> {
  const res = await httpRequest<RecipeListResponse>({
    url: `${API_BASE()}/${id}`,
    method: 'GET',
  });
  return res.data;
}

export async function listRecipeListIndex(): Promise<
  RecipeListIndexResponse[]
> {
  const res = await httpRequest<RecipeListIndexResponse[]>({
    url: `${API_BASE()}/index`,
    method: 'GET',
  });
  return res.data;
}

export async function createRecipeList(
  dto: RecipeListDto,
): Promise<RecipeListResponse> {
  const res = await httpRequest<RecipeListResponse>({
    url: API_BASE(),
    method: 'POST',
    data: dto,
  });
  return res.data;
}

export async function updateRecipeList(
  id: number,
  dto: RecipeListDto,
): Promise<RecipeListResponse> {
  const res = await httpRequest<RecipeListResponse>({
    url: `${API_BASE()}/${id}`,
    method: 'PUT',
    data: dto,
  });
  return res.data;
}

export async function deleteRecipeList(
  id: number,
): Promise<{ deleted: boolean }> {
  const res = await httpRequest<{ deleted: boolean }>({
    url: `${API_BASE()}/${id}`,
    method: 'DELETE',
  });
  return res.data;
}

export async function addRecipeToList(
  id: number,
  recipeId: number,
): Promise<{ added: boolean }> {
  const res = await httpRequest<{ added: boolean }>({
    url: `${API_BASE()}/${id}/recipes/${recipeId}`,
    method: 'POST',
  });
  return res.data;
}

export async function removeRecipeFromList(
  id: number,
  recipeId: number,
): Promise<{ removed: boolean }> {
  const res = await httpRequest<{ removed: boolean }>({
    url: `${API_BASE()}/${id}/recipes/${recipeId}`,
    method: 'DELETE',
  });
  return res.data;
}
