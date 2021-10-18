import { Food } from '../services/food';
import { foods } from '../db/food';

const useFoods = (): Array<Food> => {
  return foods;
};

export default useFoods;
