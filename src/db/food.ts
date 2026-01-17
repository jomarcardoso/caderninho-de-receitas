import { FoodData } from '../services/food';
import { recipes } from './recipes';
import { beansData } from './beans';
import { aFoodData } from './a';
import { bFoodData } from './b';
import { cFoodData } from './c';
import { dFoodData } from './d';
import { eFoodData } from './e';
import { fFoodData } from './f';
import { gFoodData } from './g';
import { hFoodData } from './h';
import { iFoodData } from './i';
import { jFoodData } from './j';
import { kFoodData } from './k';
import { lFoodData } from './l';
import { mFoodData } from './m';
import { nFoodData } from './n';
import { oFoodData } from './o';
import { pFoodData } from './p';
import { qFoodData } from './q';
import { rFoodData } from './r';
import { sFoodData } from './s';
import { tFoodData } from './t';
import { uFoodData } from './u';
import { vFoodData } from './v';
import { wFoodData } from './w';
import { FoodDataService } from '../services/food-data';

export const foodsData: Array<FoodData> = [
  ...aFoodData,
  ...bFoodData,
  ...cFoodData,
  ...dFoodData,
  ...eFoodData,
  ...fFoodData,
  ...gFoodData,
  ...hFoodData,
  ...iFoodData,
  ...jFoodData,
  ...kFoodData,
  ...lFoodData,
  ...mFoodData,
  ...nFoodData,
  ...oFoodData,
  ...pFoodData,
  ...qFoodData,
  ...rFoodData,
  ...sFoodData,
  ...tFoodData,
  ...uFoodData,
  ...vFoodData,
  ...wFoodData,
  ...recipes,
  ...beansData,
];

export const foods = foodsData
  .map(FoodDataService.format)
  .map((food, index) => ({
    ...food,
    id: index,
  }));
