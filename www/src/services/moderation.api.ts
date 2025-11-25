import type { Food } from '@common/services/food/food.model';
import { httpRequest } from '@common/services/http/http-client';

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5106').replace(/\/$/, '');

export type PendingRecipe = {
  id: number;
  name: string;
  imgs?: string[];
  description?: string;
  ownerId: string;
  isPublic: boolean;
  verified: boolean;
  createdAt: string;
};

export type PendingFoodEdit = {
  id: number;
  foodId: number;
  proposedBy: string;
  payload: string;
  createdAt: string;
};

export type PendingFoodEditItem = PendingFoodEdit & {
  currentFood?: Food | null;
};

export async function fetchPendingRecipes(): Promise<PendingRecipe[]> {
  const res = await httpRequest<PendingRecipe[]>({
    url: `${API_BASE}/api/Recipe/pending`,
    method: 'GET',
  });
  return res.data;
}

export async function approveRecipe(id: number): Promise<void> {
  await httpRequest({
    url: `${API_BASE}/api/Recipe/${id}/approve`,
    method: 'POST',
  });
}

export async function denyRecipe(id: number): Promise<void> {
  await httpRequest({
    url: `${API_BASE}/api/Recipe/${id}/deny`,
    method: 'POST',
  });
}

export async function fetchPendingFoodEdits(
  foodId?: number,
): Promise<PendingFoodEditItem[]> {
  const params =
    typeof foodId === 'number' && foodId > 0 ? `?foodId=${foodId}` : '';
  const res = await httpRequest<PendingFoodEdit[]>({
    url: `${API_BASE}/api/food-edits/pending${params}`,
    method: 'GET',
  });
  const list = res.data ?? [];
  const uniqueIds = Array.from(new Set(list.map((item) => item.foodId))).filter(
    (id) => id > 0,
  );
  const foods = new Map<number, Food>();
  await Promise.all(
    uniqueIds.map(async (id) => {
      try {
        const resp = await httpRequest<Food>({
          url: `${API_BASE}/api/food/${id}`,
          method: 'GET',
          skipAuth: true,
        });
        foods.set(id, resp.data);
      } catch {
        // ignore missing foods
      }
    }),
  );
  return list.map((item) => ({
    ...item,
    currentFood: foods.get(item.foodId),
  }));
}

export async function approveFoodEdit(id: number): Promise<void> {
  await httpRequest({
    url: `${API_BASE}/api/food-edits/${id}/approve`,
    method: 'POST',
  });
}

export async function rejectFoodEdit(id: number): Promise<void> {
  await httpRequest({
    url: `${API_BASE}/api/food-edits/${id}/reject`,
    method: 'POST',
  });
}
