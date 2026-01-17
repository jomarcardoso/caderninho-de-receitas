import * as AminoAcidServices from './amino-acid.service';

export const AminoAcidService = AminoAcidServices;

export { AMINO_ACIDS, TRANSLATED_AMINO_ACIDS } from './amino-acid.constants';

export type {
  AminoAcids,
  EssencialAminoAcids,
  NonEssencialAminoAcids,
} from './amino-acid.constants';
