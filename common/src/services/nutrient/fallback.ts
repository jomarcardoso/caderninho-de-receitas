import type { Nutrient } from './nutrient.model';
import type { NutrientBase } from './nutrient.types';

export type NutrientDict = Record<string, NutrientBase>;

export const VITAMINS_FALLBACK: NutrientDict = {
  A: { index: 0, name: { en: 'Retinol', pt: 'Retinol' }, shortName: 'A', measurementUnit: 'µg' },
  AlphaCarotene: { index: 1, name: { en: 'Alpha Carotene', pt: 'Alfa-caroteno' }, shortName: 'Alfa caroteno', measurementUnit: 'µg' },
  B1: { index: 2, name: { en: 'Thiamine', pt: 'Tiamina' }, shortName: 'B1', measurementUnit: 'mg' },
  B11: { index: 3, name: { en: 'Pteroylheptaglutamic acid', pt: 'Ácido pteroilheptaglutâmico' }, shortName: 'B11', measurementUnit: 'mg' },
  B12: { index: 4, name: { en: 'Cobalamin', pt: 'Cobalamina' }, shortName: 'B12', measurementUnit: 'µg' },
  B2: { index: 5, name: { en: 'Riboflavin', pt: 'Riboflavina' }, shortName: 'B2', measurementUnit: 'mg' },
  B3: { index: 6, name: { en: 'Niacin', pt: 'Niacina' }, shortName: 'B3', measurementUnit: 'mg' },
  B5: { index: 7, name: { en: 'Pantothenic acid', pt: 'Ácido pantotênico' }, shortName: 'B5', measurementUnit: 'mg' },
  B6: { index: 8, name: { en: 'Pyridoxine', pt: 'Piridoxina' }, shortName: 'B6', measurementUnit: 'mg' },
  B7: { index: 9, name: { en: 'Biotin', pt: 'Biotina' }, shortName: 'B7', measurementUnit: 'mg' },
  B9: { index: 10, name: { en: 'Folic acid', pt: 'Ácido fólico' }, shortName: 'B9', measurementUnit: 'µg' },
  BetaCarotene: { index: 11, name: { en: 'Beta Carotene', pt: 'Betacaroteno' }, shortName: 'Betacaroteno', measurementUnit: 'µg' },
  C: { index: 12, name: { en: 'Ascorbic acid', pt: 'Ácido ascórbico' }, shortName: 'C', measurementUnit: 'mg' },
  Choline: { index: 13, name: { en: 'Choline', pt: 'Colina' }, shortName: 'Colina', measurementUnit: 'mg' },
  CryptoxanthinCarotene: { index: 14, name: { en: 'Cryptoxanthin', pt: 'Criptoxantina' }, shortName: 'Criptoxantina', measurementUnit: 'µg' },
  D: { index: 15, name: { en: 'Cholecalciferol', pt: 'Colecalciferol' }, shortName: 'D', measurementUnit: 'UI' },
  D2: { index: 16, name: { en: 'Ergocalciferol', pt: 'Ergocalciferol' }, shortName: 'D2', measurementUnit: 'µg' },
  D3: { index: 17, name: { en: 'Cholecalciferol', pt: 'Colecalciferol' }, shortName: 'D3', measurementUnit: 'µg' },
  E: { index: 18, name: { en: 'Tocopherol', pt: 'Tocoferol' }, shortName: 'E', measurementUnit: 'mg' },
  K: { index: 19, name: { en: 'Phylloquinone or Phytomenadione', pt: 'Filoquinona ou Fitomenadiona' }, shortName: 'K', measurementUnit: 'µg' },
  Lycopene: { index: 20, name: { en: 'Lycopene', pt: 'Licopeno' }, shortName: 'Licopeno', measurementUnit: 'µg' },
};

export const MINERALS_FALLBACK: NutrientDict = {
  Calcium: { index: 0, name: { en: 'Calcium', pt: 'Cálcio' }, shortName: 'Ca', measurementUnit: 'mg' },
  Copper: { index: 1, name: { en: 'Copper', pt: 'Cobre' }, shortName: 'Cu', measurementUnit: 'mg' },
  Fluoride: { index: 2, name: { en: 'Fluoride', pt: 'Flúor' }, shortName: 'F', measurementUnit: 'µg' },
  Iron: { index: 3, name: { en: 'Iron', pt: 'Ferro' }, shortName: 'Fe', measurementUnit: 'mg' },
  Magnesium: { index: 4, name: { en: 'Magnesium', pt: 'Magnésio' }, shortName: 'Mg', measurementUnit: 'mg' },
  Manganese: { index: 5, name: { en: 'Manganese', pt: 'Manganês' }, shortName: 'Mn', measurementUnit: 'mg' },
  Phosphorus: { index: 6, name: { en: 'Phosphorus', pt: 'Fósforo' }, shortName: 'P', measurementUnit: 'mg' },
  Potassium: { index: 7, name: { en: 'Potassium', pt: 'Potássio' }, shortName: 'K', measurementUnit: 'mg' },
  Selenium: { index: 8, name: { en: 'Selenium', pt: 'Selênio' }, shortName: 'Se', measurementUnit: 'mcg' },
  Sodium: { index: 9, name: { en: 'Sodium', pt: 'Sódio' }, shortName: 'Na', measurementUnit: 'mg' },
  Zinc: { index: 10, name: { en: 'Zinc', pt: 'Zinco' }, shortName: 'Zn', measurementUnit: 'mg' },
};

export const AMINO_ACIDS_FALLBACK: NutrientDict = {
  Alanine: { index: 0, name: { en: 'Alanine', pt: 'Alanina' }, shortName: 'Ala', measurementUnit: 'g' },
  Arginine: { index: 1, name: { en: 'Arginine', pt: 'Arginina' }, shortName: 'Arg', measurementUnit: 'g' },
  AsparticAcid: { index: 2, name: { en: 'Aspartic Acid', pt: 'Ácido Aspártico' }, shortName: 'Asp', measurementUnit: 'g' },
  Cystine: { index: 3, name: { en: 'Cystine', pt: 'Cistina' }, shortName: 'Cys', measurementUnit: 'g' },
  GlutamicAcid: { index: 4, name: { en: 'Glutamic Acid', pt: 'Ácido Glutâmico' }, shortName: 'Glu', measurementUnit: 'g' },
  Glutamine: { index: 5, name: { en: 'Glutamine', pt: 'Glutamina' }, shortName: 'Gln', measurementUnit: 'g' },
  Glycine: { index: 6, name: { en: 'Glycine', pt: 'Glicina' }, shortName: 'Gly', measurementUnit: 'g' },
  Histidine: { index: 7, name: { en: 'Histidine', pt: 'Histidina' }, shortName: 'His', measurementUnit: 'g' },
  Isoleucine: { index: 8, name: { en: 'Isoleucine', pt: 'Isoleucina' }, shortName: 'Ile', measurementUnit: 'g' },
  Leucine: { index: 9, name: { en: 'Leucine', pt: 'Leucina' }, shortName: 'Leu', measurementUnit: 'g' },
  Lysine: { index: 10, name: { en: 'Lysine', pt: 'Lisina' }, shortName: 'Lys', measurementUnit: 'g' },
  Methionine: { index: 11, name: { en: 'Methionine', pt: 'Metionina' }, shortName: 'Met', measurementUnit: 'g' },
  Phenylalanine: { index: 12, name: { en: 'Phenylalanine', pt: 'Fenilalanina' }, shortName: 'Phe', measurementUnit: 'g' },
  Proline: { index: 13, name: { en: 'Proline', pt: 'Prolina' }, shortName: 'Pro', measurementUnit: 'g' },
  Serine: { index: 14, name: { en: 'Serine', pt: 'Serina' }, shortName: 'Ser', measurementUnit: 'g' },
  Threonine: { index: 15, name: { en: 'Threonine', pt: 'Treonina' }, shortName: 'Thr', measurementUnit: 'g' },
  Tryptophan: { index: 16, name: { en: 'Tryptophan', pt: 'Triptofano' }, shortName: 'Trp', measurementUnit: 'g' },
  Tyrosine: { index: 17, name: { en: 'Tyrosine', pt: 'Tirosina' }, shortName: 'Tyr', measurementUnit: 'g' },
  Valine: { index: 18, name: { en: 'Valine', pt: 'Valina' }, shortName: 'Val', measurementUnit: 'g' },
};

export const NUTRITIONAL_INFO_FALLBACK: NutrientDict = {
  Acidification: { index: 0, name: { en: 'Acidification', pt: 'Acidificação' }, shortName: 'Acid', measurementUnit: 'pH' },
  Ashes: { index: 1, name: { en: 'Ashes', pt: 'Cinzas' }, shortName: 'Ash', measurementUnit: 'g' },
  Calories: { index: 2, name: { en: 'Calories', pt: 'Calorias' }, shortName: 'Cal', measurementUnit: 'kcal' },
  Carbohydrates: { index: 3, name: { en: 'Carbohydrates', pt: 'Carboidratos' }, shortName: 'Carb', measurementUnit: 'g' },
  Cholesterol: { index: 4, name: { en: 'Cholesterol', pt: 'Colesterol' }, shortName: 'Chol', measurementUnit: 'mg' },
  DietaryFiber: { index: 5, name: { en: 'Dietary Fiber', pt: 'Fibra Alimentar' }, shortName: 'Fiber', measurementUnit: 'g' },
  Gi: { index: 6, name: { en: 'Glycemic Index', pt: 'Índice Glicêmico' }, shortName: 'GI', measurementUnit: '' },
  Gl: { index: 7, name: { en: 'Glycemic Load', pt: 'Carga Glicêmica' }, shortName: 'GL', measurementUnit: '' },
  MonounsaturatedFats: { index: 8, name: { en: 'Monounsaturated Fats', pt: 'Gorduras Monoinsaturadas' }, shortName: 'MUFA', measurementUnit: 'g' },
  PolyunsaturatedFats: { index: 9, name: { en: 'Polyunsaturated Fats', pt: 'Gorduras Poli-insaturadas' }, shortName: 'PUFA', measurementUnit: 'g' },
  Proteins: { index: 10, name: { en: 'Proteins', pt: 'Proteínas' }, shortName: 'Prot', measurementUnit: 'g' },
  SaturedFats: { index: 11, name: { en: 'Saturated Fats', pt: 'Gorduras Saturadas' }, shortName: 'SFA', measurementUnit: 'g' },
  Sugar: { index: 12, name: { en: 'Sugar', pt: 'Açúcar' }, shortName: 'Sugar', measurementUnit: 'g' },
  TotalFat: { index: 13, name: { en: 'Total Fat', pt: 'Gordura Total' }, shortName: 'Fat', measurementUnit: 'g' },
};

function upperFirst(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function mapRecordToNutrients(
  record: any,
  dict: NutrientDict,
): Nutrient[] {
  if (!record) return [];
  if (Array.isArray(record)) return record as Nutrient[];

  return Object.entries(record)
    .map(([rawKey, value]) => {
      const directKey = rawKey as keyof typeof dict;
      const altKey = upperFirst(rawKey) as keyof typeof dict;
      const key = (directKey in dict ? directKey : altKey) as string;
      const data = (dict as any)[key] as NutrientBase | undefined;
      if (typeof value !== 'number' || !data) return null;
      return {
        quantity: Number(value) || 0,
        index: data.index,
        name: data.name,
        shortName: data.shortName,
        measurementUnit: data.measurementUnit,
      } as Nutrient;
    })
    .filter((v): v is Nutrient => v !== null)
    .sort((a, b) => a.index - b.index);
}
