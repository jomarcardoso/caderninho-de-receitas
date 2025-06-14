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

console.log(JSON.stringify(foodsData));

// const oi = foodsData.reduce((acc, a, i) => {
//   return `\
// ${a.oneMeasures?.length ? a.oneMeasures?.map((measure) => `(${i}, ${measure.quantity}, '${measure.type}')\n`) : ''}${acc},
// (${i}, ${typeof a.name === 'string' ? `'${a.name || ''}'` : a.name || 0}, ${typeof a.description === 'string' ? `'${a.description || ''}'` : a.description || 0}, ${typeof a.image === 'string' ? `'${a.image || ''}'` : a.image || 0}, ${typeof a.gi === 'string' ? `'${a.gi || ''}'` : a.gi || 0}, ${typeof a.calories === 'string' ? `'${a.calories || ''}'` : a.calories || 0}, ${typeof a.acidification === 'string' ? `'${a.acidification || ''}'` : a.acidification || 0}, ${typeof a.carbohydrates === 'string' ? `'${a.carbohydrates || ''}'` : a.carbohydrates || 0}, ${typeof a.ashes === 'string' ? `'${a.ashes || ''}'` : a.ashes || 0}, ${typeof a.proteins === 'string' ? `'${a.proteins || ''}'` : a.proteins || 0}, ${typeof a.saturedFats === 'string' ? `'${a.saturedFats || ''}'` : a.saturedFats || 0}, ${typeof a.monounsaturatedFats === 'string' ? `'${a.monounsaturatedFats || ''}'` : a.monounsaturatedFats || 0}, ${typeof a.polyunsaturatedFats === 'string' ? `'${a.polyunsaturatedFats || ''}'` : a.polyunsaturatedFats || 0}, ${typeof a.cholesterol === 'string' ? `'${a.cholesterol || ''}'` : a.cholesterol || 0}, ${typeof a.totalFat === 'string' ? `'${a.totalFat || ''}'` : a.totalFat || 0}, ${typeof a.dietaryFiber === 'string' ? `'${a.dietaryFiber || ''}'` : a.dietaryFiber || 0}, ${typeof a.sugar === 'string' ? `'${a.sugar || ''}'` : a.sugar || 0}, ${typeof a.gl === 'string' ? `'${a.gl || ''}'` : a.gl || 0}, ${typeof a.unitOfMeasurement === 'string' ? `'${a.unitOfMeasurement || ''}'` : a.unitOfMeasurement || 0}, '${(a.keys || []).join(', ')}', ${typeof a.isRecipe === 'string' ? `'${a.isRecipe || ''}'` : a.isRecipe || 0}, ${typeof a.icon === 'string' ? `'${a.icon || ''}'` : a.icon || 0}, ${typeof a.type === 'string' ? `'${a.type || ''}'` : a.type || 0})`;
// }, '');

// console.log(JSON.stringify(oi));

// // minerals
// Calcium
// Copper
// Fluoride
// Iron
// Magnesium
// Manganese
// Phosphorus
// Potassium
// Sodium
// Zinc
// Selenium

// // vitamins
// A
// AlphaCarotene
// B1
// B11
// B12
// B2
// B3
// B5
// B6
// B7
// B9
// BetaCarotene
// C
// Choline
// CryptoxanthinCarotene
// D
// D2
// D3
// E
// K
// Lycopene

// // amino acids
// Alanine
// Arginine
// AsparticAcid
// Cystine
// GlutamicAcid
// Glutamine
// Glycine
// Histidine
// Isoleucine
// Leucine
// Lysine
// Methionine
// Phenylalanine
// Proline
// Serine
// Threonine
// Tryptophan
// Tyrosine
// Valine
