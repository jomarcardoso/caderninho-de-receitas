import type { FoodForm } from '../components/food-register/food-register-form';
import type { Language } from 'services/language/language.types';
import { buildFoodPayloadForSave } from './food.payload';
import { httpRequest } from 'services/http/http-client';

function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

async function postFoodEdit(body: unknown): Promise<boolean> {
  try {
    await httpRequest({
      url: `${getApiBase()}/api/food-edits`,
      method: 'POST',
      data: body,
    });
    return true;
  } catch {
    return false;
  }
}

export async function submitFoodEdit(foodId: number, form: FoodForm, language: Language): Promise<boolean> {
  const payload = buildFoodPayloadForSave(form, language);
  return postFoodEdit({ foodId, payload });
}

export async function submitFoodEditPayload(foodId: number, payload: any): Promise<boolean> {
  return postFoodEdit({ foodId, payload });
}
