import type { AminoAcids } from '../amino-acid';
import type { Minerals } from '../mineral';
import type { NutritionalInformation } from '../nutritional-information';
import type { Vitamins } from '../vitamin';

export interface Nutrients {
  nutritionalInformation: NutritionalInformation;
  minerals: Minerals;
  vitamins: Vitamins;
  aminoAcids: AminoAcids;
}
