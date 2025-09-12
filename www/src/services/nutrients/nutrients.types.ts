import type { AminoAcids } from '../amino-acid';
import type { Minerals } from '../mineral';
import type { NutritionalInformation } from '../nutritional-information';
import { Vitamins } from '../vitamin/vitamin.types';

export interface Nutrients {
  nutritionalInformation: NutritionalInformation;
  minerals: Minerals;
  vitamins: Vitamins;
  aminoAcids: AminoAcids;
}
