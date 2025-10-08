export type AminoAcidKey =
  | 'alanine'
  | 'arginine'
  | 'asparticAcid'
  | 'cystine'
  | 'glutamicAcid'
  | 'glutamine'
  | 'glycine'
  | 'histidine'
  | 'isoleucine'
  | 'leucine'
  | 'lysine'
  | 'methionine'
  | 'phenylalanine'
  | 'proline'
  | 'serine'
  | 'threonine'
  | 'tryptophan'
  | 'tyrosine'
  | 'valine';

export type AminoAcids = Record<AminoAcidKey, number>;

export type AminoAcidsData = Partial<AminoAcids>;

export const AMINO_ACIDS: AminoAcids = {
  alanine: 0,
  arginine: 0,
  asparticAcid: 0,
  cystine: 0,
  glutamicAcid: 0,
  glutamine: 0,
  glycine: 0,
  histidine: 0,
  isoleucine: 0,
  leucine: 0,
  lysine: 0,
  methionine: 0,
  phenylalanine: 0,
  proline: 0,
  serine: 0,
  threonine: 0,
  tryptophan: 0,
  tyrosine: 0,
  valine: 0,
};
