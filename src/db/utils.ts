import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import type { FoodData } from '../services/food';
import { FoodMyFoodData, FoodNacional } from './db.types';
import { AMINO_ACIDS } from '../services/amino-acid';
import { VITAMINS_DATA } from '../services/vitamin/vitamin.constants';
import { MINERALS_DATA } from '../services/mineral';

export function verifyQuantity<T>(objValue: T, srcValue: T): T {
  if (isNumber(objValue)) {
    const objValueNumber = Number(objValue);

    if (objValueNumber) {
      return objValue;
    }

    return srcValue;
  }

  return objValue;
}

export function formatNacional(food: FoodNacional): FoodData {
  return {
    name: food?.description.replace(/,/g, ''),
    acidification: 0,
    calories: !isString(food?.attributes?.energy?.kcal)
      ? food?.attributes?.energy?.kcal ?? 0
      : 0,
    ashes: !isString(food?.attributes?.ashes?.qty)
      ? food?.attributes?.ashes?.qty ?? 0
      : 0,
    proteins: !isString(food?.attributes?.protein?.qty)
      ? food?.attributes?.protein?.qty ?? 0
      : 0,
    saturedFats: !isString(food?.attributes?.fatty_acids?.saturated?.qty)
      ? food?.attributes?.fatty_acids?.saturated?.qty ?? 0
      : 0,
    monounsaturatedFats: !isString(
      food?.attributes?.fatty_acids?.monounsaturated?.qty,
    )
      ? food?.attributes?.fatty_acids?.monounsaturated?.qty ?? 0
      : 0,
    polyunsaturatedFats: !isString(
      food?.attributes?.fatty_acids?.polyunsaturated?.qty,
    )
      ? food?.attributes?.fatty_acids?.polyunsaturated?.qty ?? 0
      : 0,
    totalFat: !isString(food?.attributes?.lipid?.qty)
      ? food?.attributes?.lipid?.qty ?? 0
      : 0,
    cholesterol: !isString(food?.attributes?.cholesterol?.qty)
      ? food?.attributes?.cholesterol?.qty ?? 0
      : 0,
    carbohydrates: !isString(food?.attributes?.carbohydrate?.qty)
      ? food?.attributes?.carbohydrate?.qty ?? 0
      : 0,
    dietaryFiber: !isString(food?.attributes?.fiber?.qty)
      ? food?.attributes?.fiber?.qty ?? 0
      : 0,
    aminoAcids: {
      ...AMINO_ACIDS,
      alanine: 0,
    },
    vitamins: {
      ...VITAMINS_DATA,
      c: !isString(food?.vitaminC?.qty) ? food?.vitaminC?.qty ?? 0 : 0,
      a: !isString(food?.attributes?.retinol?.qty)
        ? Number(food?.attributes?.retinol?.qty) ?? 0
        : 0,
      b1: !isString(food?.attributes?.thiamine?.qty)
        ? food?.attributes?.thiamine?.qty ?? 0
        : 0,
      b2: !isString(food?.attributes?.riboflavin?.qty)
        ? food?.attributes?.riboflavin?.qty ?? 0
        : 0,
      b3: !isString(food?.attributes?.niacin?.qty)
        ? food?.attributes?.niacin?.qty ?? 0
        : 0,
      b6: !isString(food?.attributes?.pyridoxine?.qty)
        ? food?.attributes?.pyridoxine?.qty ?? 0
        : 0,
    },
    minerals: {
      ...MINERALS_DATA,
      calcium: !isString(food?.attributes?.calcium?.qty)
        ? Number(food?.attributes?.calcium?.qty) ?? 0
        : 0,
      magnesium: !isString(food?.attributes?.magnesium?.qty)
        ? food?.attributes?.magnesium?.qty ?? 0
        : 0,
      phosphorus: !isString(food?.attributes?.phosphorus?.qty)
        ? food?.attributes?.phosphorus?.qty ?? 0
        : 0,
      iron: !isString(food?.attributes?.iron?.qty)
        ? food?.attributes?.iron?.qty ?? 0
        : 0,
      potassium: !isString(food?.attributes?.potassium?.qty)
        ? food?.attributes?.potassium?.qty ?? 0
        : 0,
      sodium: !isString(food?.attributes?.sodium?.qty)
        ? food?.attributes?.sodium?.qty ?? 0
        : 0,
      zinc: !isString(food?.attributes?.zinc?.qty)
        ? food?.attributes?.zinc?.qty ?? 0
        : 0,
      copper: !isString(food?.attributes?.copper?.qty)
        ? food?.attributes?.copper?.qty ?? 0
        : 0,
      manganese: !isString(food?.attributes?.manganese?.qty)
        ? food?.attributes?.manganese?.qty ?? 0
        : 0,
    },
    unitOfMeasurement: food?.base_unit === 'g' ? 'gram' : 'liter',
  };
}

export function formatMyFood(food: FoodMyFoodData): FoodData {
  return {
    saturedFats: food.FASAT,
    calories: food.ENERC_KCAL,
    aminoAcids: {
      alanine: food.ALA_G,
      arginine: food.ARG_G,
      asparticAcid: food.ASP_G,
      cystine: food.CYS_G,
      glutamicAcid: food.GLU_G,
      glutamine: 0,
      glycine: food.GLY_G,
      histidine: food.HISTN_G,
      isoleucine: food.ILE_G,
      leucine: food.LEU_G,
      lysine: food.LYS_G,
      methionine: food.MET_G,
      phenylalanine: food.PHE_G,
      proline: food.PRO_G,
      serine: food.SER_G,
      threonine: food.THR_G,
      tryptophan: food.TRP_G,
      tyrosine: food.TYR_G,
      valine: food.VAL_G,
    },
    carbohydrates: food.CHOCDF,
    proteins: Number(food.PROCNT),
    totalFat: Number(food.FAT),
    vitamins: {
      ...VITAMINS_DATA, // tem que tirar isso
      c: food.VITC,
      a: food.VITA_RAE, // talvez não
      betaCarotene: food.CARTB,
      alphaCarotene: food.CARTA,
      lycopene: food.LYCPN,
      k: food.VITK1,
      choline: food.CHOLN,
      b3: food.NIA,
      b12: food.VITB12,
      b2: food.RIBF,
      b6: food.VITB6A,
      d: food.VITD_IU,
    },
    minerals: {
      ...MINERALS_DATA,
      calcium: food.CA,
      iron: food.FE,
      potassium: food.K,
      magnesium: food.MG,
      phosphorus: food.P,
      manganese: food.MN,
      copper: food.CU,
      sodium: food.NA,
      zinc: food.ZN,
    },
  };
}
