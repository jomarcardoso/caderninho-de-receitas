import type { LanguageText } from '../language/language.types';
import type { MeasureType } from '../measure/measure.types';
import type { Measures } from '../measure/measures.types';
import type { NutritionalInformationType } from '../nutritional-information/nutritional-information.types';
import type { MineralType } from '../mineral/mineral.types';
import type { VitaminType } from '../vitamin/vitamin.types';
import type { AminoAcidType } from '../amino-acid/amino-acid.types';
import type { MeasurementUnitDto } from '../measurement-unit/measurement-unit.types';
import { FoodType } from './food.types';

// Nutrient maps keyed by enum string as per API contract
export type NutritionalInformationDto = Partial<
  Record<Lowercase<NutritionalInformationType>, number>
>;

export type MineralsDto = Partial<Record<Lowercase<MineralType>, number>>;

export type VitaminsDto = Partial<Record<Lowercase<VitaminType>, number>>;

export type AminoAcidsDto = Partial<Record<Lowercase<AminoAcidType>, number>>;

export interface FoodDto {
  id?: number;
  name: LanguageText;
  keys: LanguageText;
  description: LanguageText;
  imgs: string[];
  measurementUnit: MeasurementUnitDto;
  measures: Measures;
  categories: string[];
  iconId?: number;
  type: FoodType;
  nutritionalInformation?: NutritionalInformationDto;
  minerals?: MineralsDto;
  vitamins?: VitaminsDto;
  aminoAcids?: AminoAcidsDto;
}
