import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';
import type { FoodData } from 'services/food';
import { FoodMyFoodData, FoodNacional } from './db.types';
import { AMINO_ACIDS } from 'services/amino-acid';
import { VITAMINS_DATA } from 'services/vitamin/vitamin.constants';
import { MINERALS_DATA } from 'services/mineral';

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
      ? (food?.attributes?.energy?.kcal ?? 0)
      : 0,
    ashes: !isString(food?.attributes?.ashes?.qty)
      ? (food?.attributes?.ashes?.qty ?? 0)
      : 0,
    proteins: !isString(food?.attributes?.protein?.qty)
      ? (food?.attributes?.protein?.qty ?? 0)
      : 0,
    saturedFats: !isString(food?.attributes?.fatty_acids?.saturated?.qty)
      ? (food?.attributes?.fatty_acids?.saturated?.qty ?? 0)
      : 0,
    monounsaturatedFats: !isString(
      food?.attributes?.fatty_acids?.monounsaturated?.qty,
    )
      ? (food?.attributes?.fatty_acids?.monounsaturated?.qty ?? 0)
      : 0,
    polyunsaturatedFats: !isString(
      food?.attributes?.fatty_acids?.polyunsaturated?.qty,
    )
      ? (food?.attributes?.fatty_acids?.polyunsaturated?.qty ?? 0)
      : 0,
    totalFat: !isString(food?.attributes?.lipid?.qty)
      ? (food?.attributes?.lipid?.qty ?? 0)
      : 0,
    cholesterol: !isString(food?.attributes?.cholesterol?.qty)
      ? (food?.attributes?.cholesterol?.qty ?? 0)
      : 0,
    carbohydrates: !isString(food?.attributes?.carbohydrate?.qty)
      ? (food?.attributes?.carbohydrate?.qty ?? 0)
      : 0,
    dietaryFiber: !isString(food?.attributes?.fiber?.qty)
      ? (food?.attributes?.fiber?.qty ?? 0)
      : 0,
    ...AMINO_ACIDS,
    ...VITAMINS_DATA,
    c: !isString(food?.vitaminC?.qty) ? (food?.vitaminC?.qty ?? 0) : 0,
    a: !isString(food?.attributes?.retinol?.qty)
      ? (Number(food?.attributes?.retinol?.qty) ?? 0)
      : 0,
    b1: !isString(food?.attributes?.thiamine?.qty)
      ? (food?.attributes?.thiamine?.qty ?? 0)
      : 0,
    b2: !isString(food?.attributes?.riboflavin?.qty)
      ? (food?.attributes?.riboflavin?.qty ?? 0)
      : 0,
    b3: !isString(food?.attributes?.niacin?.qty)
      ? (food?.attributes?.niacin?.qty ?? 0)
      : 0,
    b6: !isString(food?.attributes?.pyridoxine?.qty)
      ? (food?.attributes?.pyridoxine?.qty ?? 0)
      : 0,
    ...MINERALS_DATA,
    calcium: !isString(food?.attributes?.calcium?.qty)
      ? (Number(food?.attributes?.calcium?.qty) ?? 0)
      : 0,
    magnesium: !isString(food?.attributes?.magnesium?.qty)
      ? (food?.attributes?.magnesium?.qty ?? 0)
      : 0,
    phosphorus: !isString(food?.attributes?.phosphorus?.qty)
      ? (food?.attributes?.phosphorus?.qty ?? 0)
      : 0,
    iron: !isString(food?.attributes?.iron?.qty)
      ? (food?.attributes?.iron?.qty ?? 0)
      : 0,
    potassium: !isString(food?.attributes?.potassium?.qty)
      ? (food?.attributes?.potassium?.qty ?? 0)
      : 0,
    sodium: !isString(food?.attributes?.sodium?.qty)
      ? (food?.attributes?.sodium?.qty ?? 0)
      : 0,
    zinc: !isString(food?.attributes?.zinc?.qty)
      ? (food?.attributes?.zinc?.qty ?? 0)
      : 0,
    copper: !isString(food?.attributes?.copper?.qty)
      ? (food?.attributes?.copper?.qty ?? 0)
      : 0,
    manganese: !isString(food?.attributes?.manganese?.qty)
      ? (food?.attributes?.manganese?.qty ?? 0)
      : 0,
    measurementUnit: food?.base_unit === 'g' ? 0 : 1,
  };
}

export function formatMyFood(food: FoodMyFoodData): FoodData {
  return {
    saturedFats: food.FASAT || 0,
    calories: food.ENERC_KCAL || 0,
    alanine: food.ALA_G || 0,
    arginine: food.ARG_G || 0,
    asparticAcid: food.ASP_G || 0,
    cystine: food.CYS_G || 0,
    glutamicAcid: food.GLU_G || 0,
    glutamine: 0,
    glycine: food.GLY_G || 0,
    histidine: food.HISTN_G || 0,
    isoleucine: food.ILE_G || 0,
    leucine: food.LEU_G || 0,
    lysine: food.LYS_G || 0,
    methionine: food.MET_G || 0,
    phenylalanine: food.PHE_G || 0,
    proline: food.PRO_G || 0,
    serine: food.SER_G || 0,
    threonine: food.THR_G || 0,
    tryptophan: food.TRP_G || 0,
    tyrosine: food.TYR_G || 0,
    valine: food.VAL_G || 0,
    carbohydrates: food.CHOCDF || 0,
    proteins: Number(food.PROCNT) || 0,
    totalFat: Number(food.FAT) || 0,
    ...VITAMINS_DATA, // tem que tirar isso
    c: food.VITC || 0,
    a: food.VITA_RAE || 0, // talvez nã || 0o
    betaCarotene: food.CARTB || 0,
    alphaCarotene: food.CARTA || 0,
    lycopene: food.LYCPN || 0,
    k: food.VITK1 || 0,
    choline: food.CHOLN || 0,
    b3: food.NIA || 0,
    b12: food.VITB12 || 0,
    b2: food.RIBF || 0,
    b6: food.VITB6A || 0,
    d: food.VITD_IU || 0,
    ...MINERALS_DATA,
    calcium: food.CA || 0,
    iron: food.FE || 0,
    potassium: food.K || 0,
    magnesium: food.MG || 0,
    phosphorus: food.P || 0,
    manganese: food.MN || 0,
    copper: food.CU || 0,
    sodium: food.NA || 0,
    zinc: food.ZN || 0,
  };
}

