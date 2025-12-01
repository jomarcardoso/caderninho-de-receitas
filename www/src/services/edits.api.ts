import type { FoodForm } from '@/components/food-register/food-register-form';
import type { Language } from 'services/language/language.types';
import { buildFoodPayloadForSave } from './food.payload';
import { httpRequest } from '@common/services/http/http-client';

const DEFAULT_API_BASE_URL = 'http://localhost:5106';

function getApiBase(): string {
  if (typeof window !== 'undefined') {
    return '';
  }
  const fromEnv =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    DEFAULT_API_BASE_URL;
  return (fromEnv || DEFAULT_API_BASE_URL).replace(/\/$/, '');
}

async function postFoodEdit(payload: any): Promise<boolean> {
  const base = getApiBase();
  try {
    await httpRequest({
      url: `${base}/api/food-edits`,
      method: 'POST',
      data: payload,
    });
    return true;
  } catch {
    return false;
  }
}

export async function submitFoodEdit(
  foodId: number,
  form: FoodForm,
  language: Language,
): Promise<boolean> {
  const payload = buildFoodPayloadForSave(form, language);
  return postFoodEdit({ foodId, payload });
}

export async function submitFoodEditPayload(
  foodId: number,
  payload: unknown,
): Promise<boolean> {
  return postFoodEdit({ foodId, payload });
}

export async function submitFoodDeletion(foodId: number): Promise<boolean> {
  return postFoodEdit({ foodId, payload: { delete: true } });
}
