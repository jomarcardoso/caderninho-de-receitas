import type { FoodForm } from '../components/food-register/food-register-form';
import type { Language } from 'services/language/language.types';
import { buildFoodPayloadForSave } from './food.payload';

function getApiBase(): string {
  const fromEnv = (import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined;
  return (fromEnv || 'http://localhost:5106').replace(/\/$/, '');
}

export async function submitFoodEdit(foodId: number, form: FoodForm, language: Language): Promise<boolean> {
  try {
    const payload = buildFoodPayloadForSave(form, language);
    const res = await fetch(`${getApiBase()}/api/food-edits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foodId, payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}


export async function submitFoodEditPayload(foodId: number, payload: any): Promise<boolean> {
  try {
    const res = await fetch(`${getApiBase()}/api/food-edits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foodId, payload }),
    });
    return res.ok;
  } catch {
    return false;
  }
}


