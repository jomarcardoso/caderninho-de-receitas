import type { Food } from './food.model';

export interface FoodIconResponse {
  id: number;
  url?: string; // public URL
}

export interface FoodSummaryResponse {
  id: number;
  name: string;
  icon: string;
  imgs: string[];
}

export type FoodResponse = Food;
