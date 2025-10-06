export interface FoodMyFoodData {
  name: string;
  name1: string;
  name2: string;
  name3: string;
  ALA_G: number; // alanine
  ARG_G: number; // arginine
  ASP_G: number; // asparticAcid
  CYS_G: number; // cystine
  GLU_G: number; // glutamicAcid
  GLUTAM: number; // glutamine
  GLY_G: number; // glycine
  HISTN_G: number; // histidine
  ILE_G: number; // isoleucine
  LEU_G: number; // leucine
  LYS_G: number; // lysine
  MET_G: number; // methionine
  PHE_G: number; // phenylalanine
  PRO_G: number; // proline
  SER_G: number; // serine
  THR_G: number; // threonine
  TRP_G: number; // tryptophan
  TYR_G: number; // tyrosine
  VAL_G: number; // valine
  CHOCDF: number; // carbohydrates
  PROCNT: number; // proteins
  FAT: number; // totalFat
  ENERC_KCAL: number; // calories
  FASAT: number; // saturedFats
  VITC: number; // c vitamin
  VITA_RAE: number; // a vitamin
  CARTB: number; // beta carotene vitamin
  CARTA: number; // alfa carotene vitamin
  LYCPN: number; // lycopene vitamin
  VITK1: number; // k vitamin
  CHOLN: number; // choline vitamin
  NIA: number; // b3
  VITB12: number; // b12
  RIBF: number; // b2
  PANTAC: number; // b5
  VITB6A: number; // b6
  VITD_IU: number; // d
  CA: number; // calcium
  FE: number; // iron
  K: number; // potassium, k
  MG: number; // magnesium
  P: number; // phosphorus
  MN: number; // manganese
  CU: number; // copper
  NA: number; // sodium
  ZN: number; // zinc
}

export interface FoodNacionalAttribute {
  qty: number | string;
  unit: string;
}

export interface FoodNacional {
  description: string; // name
  base_unit: 'g' | 'l';
  vitaminC: FoodNacionalAttribute;
  attributes: {
    humidity: FoodNacionalAttribute;
    protein: FoodNacionalAttribute;
    lipid: FoodNacionalAttribute;
    cholesterol: FoodNacionalAttribute;
    carbohydrate: FoodNacionalAttribute;
    fiber: FoodNacionalAttribute;
    ashes: FoodNacionalAttribute;
    calcium: FoodNacionalAttribute;
    magnesium: FoodNacionalAttribute;
    phosphorus: FoodNacionalAttribute;
    iron: FoodNacionalAttribute;
    sodium: FoodNacionalAttribute;
    potassium: FoodNacionalAttribute;
    copper: FoodNacionalAttribute;
    zinc: FoodNacionalAttribute;
    retinol: FoodNacionalAttribute;
    thiamine: FoodNacionalAttribute;
    riboflavin: FoodNacionalAttribute;
    pyridoxine: FoodNacionalAttribute;
    niacin: FoodNacionalAttribute;
    energy: {
      kcal: number;
    };
    manganese: FoodNacionalAttribute;
    fatty_acids: {
      saturated: FoodNacionalAttribute;
      monounsaturated: FoodNacionalAttribute;
      polyunsaturated: FoodNacionalAttribute;
    };
  };
}
