import type { FoodForm } from '@/components/food-register/food-register-form';
import type { Language } from 'services/language/language.types';
import { buildFoodPayloadForSave } from './food.payload';

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

export async function submitFoodEdit(
  foodId: number,
  form: FoodForm,
  language: Language,
): Promise<boolean> {
  try {
    const payload = buildFoodPayloadForSave(form, language);
    const base = getApiBase();
    const res = await fetch(`${base}/api/food-edits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ foodId, payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function submitFoodEditPayload(
  foodId: number,
  payload: unknown,
): Promise<boolean> {
  try {
    const base = getApiBase();
    const res = await fetch(`${base}/api/food-edits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ foodId, payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
