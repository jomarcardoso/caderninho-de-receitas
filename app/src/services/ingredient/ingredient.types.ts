export interface IngredientBase<TFood> {
  text: string;
  food: TFood;
  quantity: number;
  measureQuantity: number;
}
