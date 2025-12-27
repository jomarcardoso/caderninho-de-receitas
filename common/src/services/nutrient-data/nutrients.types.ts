import type { Nutrient } from '../nutrient/nutrient.model';

export interface AllNutrients {
  nutritionalInformation: Nutrient[];
  minerals: Nutrient[];
  vitamins: Nutrient[];
  aminoAcids: Nutrient[];
  essentialAminoAcids: Nutrient[];
  aminoAcidsScore: number;
}
