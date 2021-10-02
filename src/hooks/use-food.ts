import { Food, FoodService } from '../services/food';
import { foodsData } from '../db/food';

const useFoods = (): Array<Food> => {
  return foodsData.map(FoodService.format);
};

export default useFoods;
