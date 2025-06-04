import { AminoAcids } from './amino-acid.constants';

export function verifyHasAminoAcid(aminoAcids: AminoAcids): boolean {
  return Object.values(aminoAcids).some((aminoAcid) => aminoAcid !== 0);
}
