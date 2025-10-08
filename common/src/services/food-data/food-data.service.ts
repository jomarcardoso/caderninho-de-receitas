import { AMINO_ACIDS } from '../amino-acid/amino-acid.constants';
import type { AminoAcids, AminoAcidsData } from '../amino-acid/amino-acid.constants';

export function formatAminoAcids(data?: AminoAcidsData): AminoAcids {
  return Object.keys(AMINO_ACIDS).reduce((object, key) => {
    const aminoKey = key as keyof AminoAcids;

    return {
      ...object,
      [aminoKey]: data?.[aminoKey] ?? AMINO_ACIDS[aminoKey],
    };
  }, {}) as AminoAcids;
}
